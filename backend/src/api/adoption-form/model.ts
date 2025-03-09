import { Schema, model } from "mongoose";

const adoptionFormSchema = new Schema({
    shelterId: { type: Schema.Types.ObjectId, ref: "Shelter", required: true },
    presetQuestions: [
        {
            question: { type: String, required: true },
            inputType: { type: String, required: true }
        }
    ],
    name: { type: String, required: true },
    photo: { type: String, required: true },
    gender: { type: String, required: true },
    age: {
        days: { type: Number, required: true },
        months: { type: Number, required: true },
        years: { type: Number, required: true }
    },
    size: { type: String, required: true },
    vaccinated: { type: Boolean, required: true },
    neutered: { type: Boolean, required: true },
    available: { type: Boolean, required: true },
    specialCare: { type: String },
    description: { type: String, required: true },
    shelterName: { type: String, required: true }
}, { timestamps: true });

const adoptionRequestSchema = new Schema({
    adopter: { type: Schema.Types.ObjectId, ref: "Adopter", required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export const AdoptionForm = model("AdoptionForm", adoptionFormSchema); 
export const AdoptionRequest = model("AdoptionRequest", adoptionRequestSchema);