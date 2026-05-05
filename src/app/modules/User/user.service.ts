import { AppError } from "../../errors/AppErrror";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import  httpStatus  from 'http-status-codes';
import bcrypt from 'bcryptjs';
import config from "../../config";

const registerUserIntoDb =async(payload:IUser) =>{
    const { name, email, password, ...rest } = payload;
    const isUserExists =await User.findOne({email:payload.email})
    if(isUserExists){
        throw new AppError(httpStatus.CONFLICT,"User Already Exists")
    }
    const hashedPassword = await bcrypt.hash(password,Number(config.salt_rounds) as number)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        ...rest
    })
    const result = user.toObject();
    delete (result as any).password;
    return result;
}

const getMeFromDb = async (email: string) => {
    const result = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    return result;
}

const updateUserInDb = async (id: string, payload: Partial<IUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const getAllUsersFromDb = async (query: Record<string, any>) => {
    const result = await User.find(query);
    return result;
}

const getDriverRequestsFromDb = async () => {
    const result = await User.find({ isDriverRequested: true, status: "PENDING" });
    return result;
}

export const UserServices ={
    registerUserIntoDb,
    getMeFromDb,
    updateUserInDb,
    getAllUsersFromDb,
    getDriverRequestsFromDb
}