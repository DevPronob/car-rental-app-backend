export interface IUser {
  name: string;
  email: string;
  role: "user" | "admin" | "driver";
  password: string;
  phone: string;
  address?: string;
  status: string;
}
