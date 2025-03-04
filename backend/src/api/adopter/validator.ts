import { z } from "zod";
import { Genders } from "../../constants/Genders";
import { Roles } from "../../constants/Roles";

export const adopterUpdatePayloadValidator = z.object({
    userName: z
        .string()
        .trim()
        .min(2, "Username is too short")
        .max(100, "Username is too long")
        .optional(),
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email" })
        .optional(),
    phone: z
        .string()
        .trim()
        .min(10, "Phone number is too short")
        .max(15, "Phone number is too long")
        .optional(),
    address: z
        .object({
            street: z.string().trim().min(3, "Street is too short").optional(),
            city: z.string().trim().min(2, "City is too short").optional(),
            province: z.string().trim().min(2, "Province is too short").optional(),
            country: z.string().trim().min(2, "Country is too short").optional(),
        })
        .optional(),
    gender: z.nativeEnum(Genders, { message: "Invalid gender" }).optional(),
    dateOfBirth: z.string().date().optional(),
    favoritePets: z.array(z.string()).optional(), 
    role: z.literal(Roles.ADOPTER).optional(),
    status: z.boolean().optional(),
    updatedBy: z.string().trim().optional(),
}).strict();;
