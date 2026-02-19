import z from "zod";

export const createShiftSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
    maxEmployees: z
      .number()
      .int()
      .positive("Max employees must be a positive integer"),
    managerId: z
      .number()
      .int()
      .positive("Manager ID must be a positive integer"),
  })
  .refine((data) => data.endTime > data.startTime);

export const updateShiftSchema = createShiftSchema
  .extend({
    id: z.number().int().positive("Manager ID must be a positive integer"),
    status: z.enum(["draft", "published", "cancelled", "filled"]),
  })
  .omit({ managerId: true })
  .partial();

export type ShiftInput = z.infer<typeof createShiftSchema>;
export type UpdateShiftInput = z.infer<typeof updateShiftSchema>;
