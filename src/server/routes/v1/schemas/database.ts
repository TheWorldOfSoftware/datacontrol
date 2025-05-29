import type { UUID } from "node:crypto";
import { z } from "zod";

const databaseSchema = z.object({
  name: z.string(),
  host: z.string(),
  admin: z.string(),
  password: z.string()
});

const databaseIdSchema = z.object({
  databaseId: z.string().uuid() as z.ZodType<UUID>
});

export const paramDatabaseIdSchema = {
  params: databaseIdSchema
};

export const bodyDatabaseSchema = {
  body: databaseSchema
};

export const updateDatabaseSchema = {
  body: databaseSchema,
  params: databaseIdSchema
};
