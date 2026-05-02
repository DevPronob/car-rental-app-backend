import mongoose from 'mongoose';
import { User } from './src/app/modules/User/user.model';
import dotenv from 'dotenv';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log('Connected to DB');
        const users = await User.find();
        console.log('Users in DB:', JSON.stringify(users, null, 2));
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkUsers();
