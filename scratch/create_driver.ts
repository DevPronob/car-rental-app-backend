import mongoose from 'mongoose';
import { User } from './src/app/modules/User/user.model';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createDriver = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        
        const existingDriver = await User.findOne({ email: 'driver@carrental.com' });
        if (existingDriver) {
            console.log('Driver already exists');
            await mongoose.disconnect();
            return;
        }

        const hashedPassword = await bcrypt.hash("password123", 12);
        await User.create({
            name: "Professional Driver",
            email: "driver@carrental.com",
            password: hashedPassword,
            role: "driver",
            phone: "5556667777",
            address: "789 Driver Blvd, Speed City",
            status: "ACTIVE"
        });

        console.log('Driver created successfully!');
        console.log('Email: driver@carrental.com');
        console.log('Password: password123');
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

createDriver();
