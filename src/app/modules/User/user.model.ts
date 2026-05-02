import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { UserStatus } from "./user.constant";

const userSchema =new Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
         type: String,
        required: [true, "password is required"],
        select: 0
    },
     role: {
        type: String,
        enum: ['admin', 'user', 'driver'],
        default: 'user'
    },
     phone: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.ACTIVE
    },
    isDriverRequested: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true,
    versionKey:false
})


export const User = model<IUser>('User', userSchema);