import type { UUID } from "crypto";
import Database from "../../../../models/database.js";
import { z } from "zod";

const databaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  host: z.string()
});

export function parseDatabase(data: unknown): Database {
  return databaseSchema
    .transform((obj) => {
      return new Database(obj.id as UUID, obj.name, obj.host);
    })
    .parse(data);
}
