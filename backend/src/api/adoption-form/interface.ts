import { Types } from "mongoose";

export interface IField {
    label: string;
    type: "text" | "number" | "email" | "date" | "select" | "checkbox"; 
    required: boolean;
    options?: string[]; 
    shelter: Types.ObjectId;
}

export interface IForm extends Document {
    name: string; 
    fields: IField[]; 
    shelterId: Types.ObjectId;
}