import type { UUID } from "node:crypto";
import { z } from "zod";

const uuidSchema = z.string().uuid();

export function parseUUID(data: unknown): UUID {
  return uuidSchema.parse(data) as UUID;
}

export type UUIDSchema = UUID;
