import type { UUID } from "node:crypto";
import Database from "../../../../models/database.js";
import { z } from "zod";

const databaseSchema = z
  .object({
    id: z.string().uuid() as z.ZodType<UUID>,
    name: z.string(),
    host: z.string()
  })
  .transform((obj) => {
    return new Database(obj.id as UUID, obj.name, obj.host);
  });

const databaseIdSchema = z.object({
  database: z.string().uuid() as z.ZodType<UUID>
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
