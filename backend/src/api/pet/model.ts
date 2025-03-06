import { Document, Schema, model } from "mongoose";
import { IPet, PetStatus, PetType, PetSize } from "./interface";
import { Genders } from "../../constants/Genders";

const petSchema = new Schema<IPet>({
    name: { type: String, required: true },
    photos: { type: [String], required: true },
    type: { type: String, enum: Object.values(PetType), required: true },
    sex: { type: String, enum: Object.values(Genders), required: true },
    breed: { type: String },
    description: { type: String },
    age: {
        days: { type: Number, required: true },
        months: { type: Number, required: true },
        years: { type: Number, required: true },
    },
    size: { type: String, enum: Object.values(PetSize), required: true },
    neutered: { type: Boolean, default: false },
    vaccinated: { type: Boolean, default: false },
    specialCare: { type: String, default: "" },
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter", required: true },
    adopter: { type: Schema.Types.ObjectId, ref: "Adopter", default: null },
    status: { type: String, enum: Object.values(PetStatus), default: PetStatus.AVAILABLE},
    available: { type: Boolean, default: true },
}, { timestamps: true });

export default model<IPet>("Pet", petSchema);
