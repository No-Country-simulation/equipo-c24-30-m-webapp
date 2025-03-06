import { Types, Document } from "mongoose";
import { Genders } from "../../constants/Genders";
import { Age } from "../../constants/Age";

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

export enum PetSize {
    SMALL = "pequeño",
    MEDIUM = "mediano",
    LARGE = "grande"
}

export interface IPet extends Document {
    _id: Types.ObjectId;
    name: string;
    photos: string[];
    age: Age;
    type: PetType;
    size: PetSize;
    sex: Genders;
    breed?: string;
    neutered?: boolean;
    vaccinated?: boolean;
    specialCare?: boolean | null;
    description?: string;
    images: string[];
    shelter: Types.ObjectId;
    adopter?: Types.ObjectId;
    status: PetStatus;
    createdAt: Date;
    available: boolean;
    updatedAt?: Date;
}

export interface PetCreateFields {
    name: string;
    photos: string[];
    age: {
        days: number;
        months: number;
        years: number;
    };
    size: PetSize;
    type: PetType;
    sex: Genders;
    neutered: boolean;
    vaccinated: boolean;
    available: boolean;
    specialCare: boolean | null;
    breed?: string;
    description?: string;
    images?: string[];
    shelter: Types.ObjectId;
}

export interface PetUpdateFields {
    name?: string;
    age?: Age;
    type?: PetType;
    sex?: Genders;
    breed?: string;
    neutered?: boolean;
    vaccinated?: boolean;
    specialCare?: boolean | null;
    description?: string;
    images?: string[];
    status?: PetStatus;
    shelter?: Types.ObjectId;
    adopter?: Types.ObjectId;
}

export interface PetResponse {
    id: string;
    name: string;
    photos: string[];
    age: Age;
    type: PetType;
    size: PetSize;
    sex: Genders;
    breed?: string;
    neutered?: boolean;
    vaccinated?: boolean;
    specialCare?: boolean | null;
    description?: string;
    images: string[];
    shelter: Types.ObjectId;
    adopter?: Types.ObjectId;
    status: PetStatus;
    createdAt: Date;
    available: boolean;
    updatedAt?: Date;
}

export interface Range<T> {
    min: T;
    max: T;
}

export interface PetFilters {
    species?: PetType;
    sex?: Genders;
    healthStatus?: string;
    age?: Range<Age>;
    address?: {
        country?: string;
        province?: string;
        city?: string;
    }
}
