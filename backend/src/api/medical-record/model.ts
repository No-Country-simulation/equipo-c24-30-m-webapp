// LIBRARIES
import { Schema, model } from "mongoose";

// MODELS

const medicalRecordSchema = new Schema(
  {
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    vaccinations: [{ type: String }],
    medicalHistory: [{ type: String }],
  },
  { timestamps: true }
);

const MedicalRecord = model("MedicalRecord", medicalRecordSchema);
