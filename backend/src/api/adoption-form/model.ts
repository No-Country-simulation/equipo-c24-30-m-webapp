import mongoose, { Schema, Document } from "mongoose";
import { IField, IForm } from "./interface";

const FieldSchema = new Schema<IField>({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "number", "email", "date", "select", "checkbox"],
    required: true,
  },
  required: { type: Boolean, default: false },
  options: { type: [String], default: undefined },
});

const FormSchema = new Schema<IForm>({
  name: { type: String, required: true },
  fields: [FieldSchema],
  shelterId: {
    type: Schema.Types.ObjectId,
    ref: "Shelter",
    required: true,
  },
});

const Form = mongoose.model<IForm>("Form", FormSchema);
export default Form;
