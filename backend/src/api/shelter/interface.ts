// INTERFACES
import { Types } from "mongoose";
import { IUser } from "../user/interface";

export interface IShelter extends IUser {
    shelterName: string;
    animals: Types.ObjectId[];
    verified: boolean;
}

export interface ShelterCreateFields {
    email: string;
    password: string;
    shelterName: string;
    address?: string;
    phone?: string;
}

export interface ShelterUpdateFields {
    shelterName?: string;
    address?: string;
    phone?: string;
    verified?: boolean;
}

export interface ShelterResponse
    extends Omit<IShelter, "password"> {
    id: string;
    animals: Types.ObjectId[];
}
