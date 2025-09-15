/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IUser } from "../../modules/user/user.interface";

declare global {
  namespace Express {
    interface User extends IUser {}  // now req.user is IUser
  }
}
