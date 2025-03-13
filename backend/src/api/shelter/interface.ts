// INTERFACES
import { IUser } from "../user/interface";

export interface IShelter extends IUser {
  shelterName: string;
  verified: boolean;
  shelterEmail: string;
  shelterPhone: string;
}

export interface ShelterCreateFields {
  email: string;
  password: string;
  shelterName: string;
  address?: { street: string; city: string; province: string; country: string };
  phone?: string;
  shelterEmail: string;
  shelterPhone: string;
}

export interface ShelterUpdateFields {
  shelterName?: string;
  address?: { street: string; city: string; province: string; country: string };
  phone?: string;
  verified?: boolean;
  shelterEmail: string;
  shelterPhone: string;
}

export interface ShelterResponse extends Omit<IShelter, "password"> {
  id: string;
}
