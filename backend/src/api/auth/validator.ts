// LIBRARIES
import { z } from "zod";

export const userCreatePayloadValidator = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password is too short" }).trim(),
});

export const userLoginPayloadValidator = z.object({
    email: z.string().email({ message: "Invalid credentials" }),
    password: z.string().min(1, { message: "Invalid credentials" }),
});


