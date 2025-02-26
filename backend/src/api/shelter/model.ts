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
        pets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Pet",
            },
        ],
        verified: { type: Boolean, default: false }, // Indica si el refugio fue verificado por un admin
    })
);

export default Shelter;
