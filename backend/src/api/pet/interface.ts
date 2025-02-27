// INTERFACES
import { Types, Document } from "mongoose";

export enum PetStatus {
    AVAILABLE = "available",
    ADOPTED = "adopted",
    PENDING = "pending",
}

export enum PetType {
    DOG = "dog",
    CAT = "cat",
    OTHER = "other",
}

export interface IPet extends Document {
    _id: Types.ObjectId;
    name: string;
    age: number;
    type: PetType;
    breed?: string;
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
    age: number;
    type: PetType;
    breed?: string;
    description?: string;
    images?: string[];
    shelter: Types.ObjectId;
}

export interface PetUpdateFields {
    name?: string;
    age?: number;
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
