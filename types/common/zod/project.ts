import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  createdAt: z.string().optional(),
  lastWorkedOnAt: z.string().optional(),
  status: z.enum(["dead", "active"]).optional(),
});

export const projectSchemaWithId = projectSchema.extend({ _id: z.string() });

export type Project = z.infer<typeof projectSchema>;
