import { z } from "zod";
import { ReportCategory, ReportStatus } from "./interface";

export const reportCreatePayloadValidator = z.object({
  category: z.enum(
    Object.values(ReportCategory) as [ReportCategory, ...ReportCategory[]],
    {
      message: "Categoría no válida",
    }
  ),
  url: z.string().url("La URL no es válida").optional(),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  userId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del usuario debe ser un ObjectId válido"
    ),
  status: z.enum(
    Object.values(ReportStatus) as [ReportStatus, ...ReportStatus[]],
    {
      message: "Estado no válido",
    }
  ),
});

export const reportUpdatePayloadValidator = z
  .object({
    category: z
      .enum(
        Object.values(ReportCategory) as [ReportCategory, ...ReportCategory[]]
      )
      .optional(),
    url: z.string().url("La URL no es válida").optional(),
    description: z
      .string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .optional(),
    status: z
      .enum(Object.values(ReportStatus) as [ReportStatus, ...ReportStatus[]])
      .optional(),
  })
  .strict();
