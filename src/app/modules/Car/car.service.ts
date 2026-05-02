import { TCar } from './car.interface';
import { Car } from './car.model';
import { Booking } from '../Booking/booking.model';
import { AppError } from '../../errors/AppErrror';
import httpStatus from 'http-status-codes';

const createCarIntoDb = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result;
};

const getAllCarsFromDb = async (query: Record<string, any>) => {
    const { searchTerm, minPrice, maxPrice, ...filters } = query;
    const queryObject: Record<string, any> = { isDeleted: false };

    if (searchTerm) {
        queryObject.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    const min = Number(minPrice);
    const max = Number(maxPrice);
    
    if (!isNaN(min) || !isNaN(max)) {
        queryObject.pricePerHour = {};
        if (!isNaN(min)) queryObject.pricePerHour.$gte = min;
        if (!isNaN(max)) queryObject.pricePerHour.$lte = max;
    }

    Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            queryObject[key] = filters[key];
        }
    });

    return await Car.find(queryObject);
};

const getSingleCarFromDb = async (id: string) => {
    const result = await Car.findById(id);
    return result;
};

const updateCarInDb = async (id: string, payload: Partial<TCar>) => {
    const result = await Car.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteCarFromDb = async (id: string) => {
    const result = await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
};

const returnCarInDb = async (bookingId: string, endTime: string) => {
    const booking = await Booking.findById(bookingId).populate('car');
    if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const car = booking.car as any;
    const startTime = booking.startTime;
    
    // Simple time calculation (assuming same day for now as per requirements)
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const durationHours = Math.max(0, (endH + endM / 60) - (startH + startM / 60));
    let totalCost = durationHours * (car?.pricePerHour || 0);
    
    // Ensure totalCost is a valid number
    if (isNaN(totalCost)) {
        totalCost = booking.costWithFeature || 0;
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
            endTime,
            costWithFeature: totalCost,
            status: 'completed'
        },
        { new: true, runValidators: false }
    );

    // Update car status if car exists
    if (car && car._id) {
        await Car.findByIdAndUpdate(car._id, { status: 'available' });
    }

    return updatedBooking;
};

export const CarServices = {
    createCarIntoDb,
    getAllCarsFromDb,
    getSingleCarFromDb,
    updateCarInDb,
    deleteCarFromDb,
    returnCarInDb
};
