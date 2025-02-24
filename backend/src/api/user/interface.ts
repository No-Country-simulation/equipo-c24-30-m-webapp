// LIBRARIES
import { Types, Document } from "mongoose";
// CONSTANTS
import { Roles } from "../../constants/Roles";

export interface IUser extends Document {
    _id: Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
    status: boolean;
    providerId?: string;
    provider: "email" | "google" | "facebook";
    googleId?: string;
    facebookId?: string;
    role: Roles;
    resetToken?: string;
    resetTokenExpires?: number;
    createdAt: Date;
    updatedAt?: Date;
    updatedBy?: string;
}

export interface UserLoginFields {
    email: string;
    password: string;
}
