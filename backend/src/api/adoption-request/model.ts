// LIBRARIES
import { Schema, model } from "mongoose";

// MODELS

const adoptionRequestSchema = new Schema({
    adopter: { type: Schema.Types.ObjectId, ref: "Adopter", required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

const AdoptionRequest = model("AdoptionRequest", adoptionRequestSchema);