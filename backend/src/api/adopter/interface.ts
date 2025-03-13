// INTERFACES
import { Types } from "mongoose";
import { IUser } from "../user/interface";
import { Genders } from "../../constants/Genders";

export interface IAdopter extends IUser {
  favoritePets: Types.ObjectId[];
  gender: Genders;
  dateOfBirth: Date;
}

export interface AdopterCreateFields {
  email: string;
  password: string;
}

export interface AdopterUpdateFields {
  userName?: string;
  dateOfBirth?: Date;
  gender?: Genders;
  email?: string;
  avatar?: string;
  phone?: string;
  address?: { street: string; city: string; province: string; country: string };
}

export interface AdopterResponse extends Omit<IAdopter, "password"> {
  id: string;
  favoritePets: Types.ObjectId[];
}

export interface AdopterLoginFields {
  email: string;
  password: string;
}
