// LIBRARIES
import { Schema, model } from "mongoose";

// MODELS
import User from "../user/model";
import Adopter from "../adopter/model";

// PET MODEL
const petSchema = new Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    healthStatus: { type: String, default: "Healthy" },
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter" },
    adopter: { type: Schema.Types.ObjectId, ref: "Adopter", default: null },
    available: { type: Boolean, default: true },
}, { timestamps: true });

const Pet = model("Pet", petSchema);