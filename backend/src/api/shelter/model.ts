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
    })
);

export default Shelter;
