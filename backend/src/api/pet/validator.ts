import { z } from "zod";
import { PetSize, PetType, PetStatus } from "./interface";
import { Genders } from "../../constants/Genders";

export const petCreatePayloadValidator = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  age: z.object({
    days: z.coerce.number().int().min(0, "Los días no pueden ser negativos"),
    months: z.coerce.number().int().min(0, "Los meses no pueden ser negativos"),
    years: z.coerce.number().int().min(0, "Los años no pueden ser negativos"),
  }),
  size: z.enum(Object.values(PetSize) as [PetSize, ...PetSize[]]),
  type: z.enum(Object.values(PetType) as [PetType, ...PetType[]]),
  sex: z.enum(Object.values(Genders) as [Genders, ...Genders[]]),
  neutered: z.boolean().optional(),
  vaccinated: z.boolean().optional(),
  available: z.boolean().optional(),
  specialCare: z.string().optional(),
  breed: z.string().optional(),
  description: z.string().optional(),
  shelter: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del refugio debe ser un ObjectId válido"
    ),
});

export const petUpdatePayloadValidator = z.object({
  name: z.string().min(1, "El nombre es obligatorio").optional(),
  age: z.object({
    days: z.coerce.number().int().min(0, "Los días no pueden ser negativos"),
    months: z.coerce.number().int().min(0, "Los meses no pueden ser negativos"),
    years: z.coerce.number().int().min(0, "Los años no pueden ser negativos"),
  }).optional(),
  size: z.enum(Object.values(PetSize) as [PetSize, ...PetSize[]]).optional(),
  type: z.enum(Object.values(PetType) as [PetType, ...PetType[]]).optional(),
  sex: z.enum(Object.values(Genders) as [Genders, ...Genders[]]).optional(),
  neutered: z.boolean().optional(),
  vaccinated: z.boolean().optional(),
  available: z.boolean().optional(),
  specialCare: z.string().optional(),
  breed: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(Object.values(PetStatus) as [PetStatus, ...PetStatus[]]).optional(),
  shelter: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "El ID del refugio debe ser un ObjectId válido")
    .optional(),
  adopter: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del adoptante debe ser un ObjectId válido"
    )
    .optional(),
});
