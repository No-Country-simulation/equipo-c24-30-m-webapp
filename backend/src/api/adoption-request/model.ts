// LIBRARIES
import { Schema, model } from "mongoose";
import { StatusRequest } from "./interface";
import { IAdoptionRequest } from "./interface";

// MODELS

const adoptionRequestSchema = new Schema(
    {
        adopter: { 
            type: Schema.Types.ObjectId, 
            ref: "Adopter", 
            required: true 
        },
        pet: { 
            type: Schema.Types.ObjectId, 
            ref: "Pet", 
            required: true 
        },
        shelter: {
            type: Schema.Types.ObjectId,
            ref: "Shelter",
            required: true
        },
        status: {
            type: String,
            enum: Object.values(StatusRequest),
            default: "Pending",
        },
        reason: { 
            type: String,
        },
        formAnswers: [
            {
                question: { type: String, required: true }, 
                answer: { type: String, required: true } 
            }
        ]
    },
    { timestamps: true }
);

const AdoptionRequest = model<IAdoptionRequest>("AdoptionRequest", adoptionRequestSchema);

export default AdoptionRequest;