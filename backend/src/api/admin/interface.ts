// INTERFACES
import { IUser } from "../user/interface";
import { Genders } from "../../constants/Genders";

export interface IAdmin extends IUser {
  gender: Genders;
  dateOfBirth: Date;
  permissions: string[];
}

export interface AdminCreateFields {
  email: string;
  password: string;
}

export interface AdminUpdateFields {
  userName?: string;
  dateOfBirth?: Date;
  gender?: Genders;
  email?: string;
  avatar?: string;
  phone?: string;
}

export interface AdminResponse extends Omit<IAdmin, "password"> {
  id: string;
}

export interface AdminLoginFields {
  email: string;
  password: string;
}
