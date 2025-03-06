// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IShelter } from "./interface";

const Shelter = User.discriminator(
    "Shelter",
    new Schema<IShelter>({
        shelterName: { type: String, required: true, trim: true },
        verified: { type: Boolean, default: false },
        shelterEmail: { 
            type: String, 
            trim: true,
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Please provide a valid email",
            ],
         }, 
        shelterPhone: { type: String, trim: true },
    })
);

export default Shelter;
