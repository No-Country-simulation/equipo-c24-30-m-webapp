import { Types, Document } from "mongoose";

export enum StatusRequest {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELED = "Canceled",
}

export interface IAdoptionRequest extends Document {
  _id: Types.ObjectId;
  adopter: Types.ObjectId;
  pet: Types.ObjectId;
  shelter: Types.ObjectId;
  status: StatusRequest;
  reason: string;
  formAnswers: { question: string; answer: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdoptionRequestLean {
  _id: Types.ObjectId;
  adopter: Types.ObjectId;
  pet: Types.ObjectId;
  shelter: Types.ObjectId;
  status: StatusRequest;
  reason: string;
  formAnswers: Array<{ question: string; answer: string }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdoptionRequestCreateFields {
  _id: Types.ObjectId;
  adopter: Types.ObjectId;
  pet: Types.ObjectId;

  status: StatusRequest;
  reason: string;
  formAnswers: { question: string; answer: string }[];
}

export interface AdoptionRequestUpdateFields {
  status?: StatusRequest;
  reason?: string;
  formAnswers?: { question: string; answer: string }[];
}

export interface AdoptionRequestResponse {
  _id: Types.ObjectId;
  adopter: Types.ObjectId;
  pet: Types.ObjectId;
  shelter: Types.ObjectId;
  status: StatusRequest;
  reason: string;
  formAnswers: { question: string; answer: string }[];
  createdAt: Date;
  updatedAt: Date;
}
