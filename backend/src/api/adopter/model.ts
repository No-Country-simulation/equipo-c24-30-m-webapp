// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IAdopter } from "./interface";

import { Genders } from "../../constants/Genders";

const Adopter = User.discriminator(
    "Adopter",
    new Schema<IAdopter>({
        favoriteAnimals: [
            {
                type: Schema.Types.ObjectId,
                ref: "Animal",
            },
        ],
        gender: {
            type: String,
            enum: Genders,
        },
        dateOfBirth: { 
            type: Date 
        },
    })
);

export default Adopter;
