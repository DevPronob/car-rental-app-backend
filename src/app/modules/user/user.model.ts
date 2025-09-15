import { model, Schema } from 'mongoose';
import { IAuthProvider, IUser } from './user.interface';
import bcrypt from 'bcryptjs';
import { Role } from './user.constant';
const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone:{type:String},
    password: { type: String},
    isBlocked: { type: Boolean, default: false },
    auths: [authProviderSchema],
    role: { type: String, enum: Object.values(Role), default: Role.RIDER },
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export const User = model<IUser>('User', userSchema);
