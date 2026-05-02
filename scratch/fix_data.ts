import mongoose from 'mongoose';
import { User } from '../src/app/modules/User/user.model';
import { Booking } from '../src/app/modules/Booking/booking.model';
import config from '../src/app/config';

const fixData = async () => {
    try {
        await mongoose.connect(config.db_url as string);
        console.log("Connected to DB");

        // 1. Update pronobroy3601@gmail.com to be a driver
        const user = await User.findOneAndUpdate(
            { email: "pronobroy3601@gmail.com" },
            { role: "driver" },
            { new: true }
        );
        
        if (user) {
            console.log(`Updated user ${user.email} to role: ${user.role}`);
        } else {
            console.log("User pronobroy3601@gmail.com not found");
        }

        // 2. Fix bookings assigned to None but marked as completed (optional, for consistency)
        const unassignedCompleted = await Booking.updateMany(
            { driver: null, status: 'completed' },
            { status: 'pending' } // or whatever makes sense
        );
        console.log(`Fixed ${unassignedCompleted.modifiedCount} unassigned completed bookings`);

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
};

fixData();
