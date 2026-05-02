import mongoose from 'mongoose';
import { Booking } from '../src/app/modules/Booking/booking.model';
import { User } from '../src/app/modules/User/user.model';
import config from '../src/app/config';

const checkData = async () => {
    try {
        await mongoose.connect(config.db_url as string);
        console.log("Connected to DB");

        const users = await User.find({});
        console.log("Users:");
        users.forEach(u => {
            console.log(`User: ID=${u._id}, Email=${u.email}, Role=${u.role}`);
        });

        const bookings = await Booking.find({}).populate('driver');
        console.log("\nBookings:");
        bookings.forEach((b, index) => {
            const driverId = b.driver ? (b.driver as any)._id : 'None';
            const driverEmail = b.driver ? (b.driver as any).email : 'None';
            console.log(`Booking ${index + 1}: ID=${b._id}, DriverID=${driverId}, DriverEmail=${driverEmail}, Status=${b.status}`);
        });

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

checkData();
