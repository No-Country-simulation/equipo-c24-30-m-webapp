import { z } from "zod";
import { StatusRequest } from "./interface";

export const adoptionRequestCreatePayloadValidator = z
  .object({
    pet: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        "El id de la mascota debe ser un ObjectId válido"
      ),
    status: z
      .enum(Object.values(StatusRequest) as [string, ...string[]], {
        errorMap: () => ({
          message: "El estado debe ser uno de los valores válidos",
        }),
      })
      .default("Pending"),
    reason: z.string().optional(),
    formAnswers: z
      .array(
        z.object({
          question: z.string().min(1, "La pregunta no puede estar vacía"),
          answer: z.string().min(1, "La respuesta no puede estar vacía"),
        })
      )
      .optional(),
  })
  .strict();

export const adoptionRequestUpdatePayloadValidator = z
  .object({
    status: z
      .enum(Object.values(StatusRequest) as [string, ...string[]], {
        errorMap: () => ({
          message: "El estado debe ser uno de los valores válidos",
        }),
      })
      .optional(),
    reason: z.string().optional(),
    formAnswers: z
      .array(
        z.object({
          question: z.string().min(1, "La pregunta no puede estar vacía"),
          answer: z.string().min(1, "La respuesta no puede estar vacía"),
        })
      )
      .optional(),
  })
  .strict();
