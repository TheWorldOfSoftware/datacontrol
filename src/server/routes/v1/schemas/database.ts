import type { DatabaseDTO } from "../../../../dtos/database.js";
import type { UUID } from "node:crypto";
import DTO from "../../../../dtos/index.js";
import { z } from "zod";

const databaseSchema = z
  .object({
    id: z.string().uuid() as z.ZodType<UUID>,
    name: z.string(),
    host: z.string(),
    admin: z.string(),
    password: z.string()
  })
  .transform(({ id, name, host, admin, password }) => {
    return new DTO<DatabaseDTO>(id, {
      name: name,
      host: host,
      admin: admin,
      password: password
    });
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
