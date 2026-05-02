import { AppError } from "../../errors/AppErrror";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import  httpStatus  from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/jwt";
import config from "../../config";

const loginUser =async(payload:Partial<IUser>) =>{
    let isUserExists =await User.findOne({email:payload.email}).select("+password")
    
    // Auto-create driver if it doesn't exist (for development convenience)
    if(!isUserExists && payload.email === 'driver@carrental.com'){
        const hashedPassword = await bcrypt.hash("password123", 12);
        isUserExists = await User.create({
            name: "Professional Driver",
            email: "driver@carrental.com",
            password: hashedPassword,
            role: "driver",
            status: "ACTIVE",
            phone: "5556667777"
        });
    }

    // Auto-create admin if it doesn't exist
    if(!isUserExists && payload.email === 'admin@carrental.com'){
        const hashedPassword = await bcrypt.hash("password123", 12);
        isUserExists = await User.create({
            name: "Master Admin",
            email: "admin@carrental.com",
            password: hashedPassword,
            role: "admin",
            status: "ACTIVE",
            phone: "1112223333"
        });
    }

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,"User Does Not Exist")
    }
    if(isUserExists.status !=="ACTIVE"){
        throw new AppError(httpStatus.FORBIDDEN,"User Is Not Active")
    }
    const isPasswordMatched =await bcrypt.compare(payload.password as string,isUserExists.password)
    if(!isPasswordMatched){
        throw new AppError(httpStatus.UNAUTHORIZED,"Password Not Matched")
    }
    
    const jwtPayload = {
        _id: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role
    }

    const accessToken = generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )

    const user = isUserExists.toObject();
    delete (user as any).password;

    return {
        user,
        accessToken
    }
}


export const AuthServices ={
    loginUser
}