import type { UUID } from "node:crypto";

export type Database = {
  Id: UUID;
  Name: string;
  Host: string;
  Admin: string;
  Password: string;
};

export const database = [
  "Id",
  "Name",
  "Host",
  "Admin",
  "Password"
] as const satisfies ReadonlyArray<keyof Database>;
