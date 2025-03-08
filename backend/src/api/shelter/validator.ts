import { z } from "zod";
import { Genders } from "../../constants/Genders";
import { Roles } from "../../constants/Roles";

export const shelterUpdatePayloadValidator = z.object({
    userName: z
        .string()
        .trim()
        .min(2, "Username is too short")
        .max(100, "Username is too long")
        .optional(),
    shelterName: z
        .string()
        .trim()
        .min(2, "shelterName is too short")
        .max(100, "shelterName is too long")
        .optional(),
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email" })
        .optional(),
    shelterEmail: z
        .string()
        .trim()
        .email({ message: "Invalid email" })
        .optional(),
    phone: z
        .string()
        .trim()
        .min(5, "Phone number is too short")
        .max(20, "Phone number is too long")
        .regex(/^\d+$/, "El número de teléfono solo debe contener dígitos")
        .optional(),
    shelterPhone: z
        .string()
        .trim()
        .min(5, "Phone number is too short")
        .max(20, "Phone number is too long")
        .regex(/^\d+$/, "El número de teléfono solo debe contener dígitos")
        .optional(),
    address: z
        .object({
            street: z.string().trim().min(3, "Street is too short").optional(),
            city: z.string().trim().min(2, "City is too short").optional(),
            province: z.string().trim().min(2, "Province is too short").optional(),
            country: z.string().trim().min(2, "Country is too short").optional(),
        })
        .optional(),
    role: z.literal(Roles.SHELTER).optional(),
    status: z.boolean().optional(),
    updatedBy: z.string().trim().optional(),
}).strict();;
