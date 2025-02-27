// INTERFACES
import { Types, Document } from "mongoose";
import { Genders } from "../../constants/Genders";

export enum PetStatus {
    AVAILABLE = "available",
    ADOPTED = "adopted",
    PENDING = "pending",
}

export enum PetHealthStatus {
    HEALTHY = "healthy",
    SICK = "sick",
}

export enum PetType {
    DOG = "dog",
    CAT = "cat",
    OTHER = "other",
}

export interface IPet extends Document {
    _id: Types.ObjectId;
    name: string;
    age: {
        days: number;
        months: number;
        years: number;
    };
    type: PetType;
    breed?: string;
    vaccinated?: boolean;
    description?: string;
    images: string[];
    shelter: Types.ObjectId; // Referencia al refugio donde está la mascota
    adopter?: Types.ObjectId; // Referencia al adoptante en caso de adopción
    status: PetStatus;
    createdAt: Date;
    updatedAt?: Date;
}

export interface PetCreateFields {
    name: string;
    age: {
        days: number;
        months: number;
        years: number;
    };
    type: PetType;
    breed?: string;
    description?: string;
    images?: string[];
    shelter: Types.ObjectId;
}

export interface PetUpdateFields {
    name?: string;
    age: {
        days: number;
        months: number;
        years: number;
    };
    type?: PetType;
    breed?: string;
    description?: string;
    images?: string[];
    status?: PetStatus;
    adopter?: Types.ObjectId;
}

export interface PetResponse
extends Omit<IPet, "_id"> {
    id: string;
}

export interface Range<T>{
    min: T;
    max: T;
}

export interface PetFilters{
    species?: PetType;
    gender?: Genders;
    healthStatus?: string;
    age?: Range<number>;
}