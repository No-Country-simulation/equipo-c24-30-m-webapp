// LIBRARIES
import { Document, Schema, model } from "mongoose";

// MODELS
import { IPet, PetStatus, PetType } from "./interface";

// PET MODEL
const petSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, enum: Object.values(PetType), required: true },
    breed: { type: String },
    description: { type: String },
    age: { type: Number, required: true },
    images: [{ type: String }],
    gender: { type: String, enum: ["Male", "Female"], required: true },
    healthStatus: { type: String, default: "Healthy" },
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter" },
    adopter: { type: Schema.Types.ObjectId, ref: "Adopter", default: null },
    status: { type: String, enum: Object.values(PetStatus), default: PetStatus.AVAILABLE},
    available: { type: Boolean, default: true },
}, { timestamps: true });

const Pet = model<IPet & Document>("Pet", petSchema); 
export default Pet;