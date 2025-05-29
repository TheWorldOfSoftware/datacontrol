import type { UUID } from "node:crypto";
import type Table from "../table.js";

type DatabaseColumns = {
  Id: UUID;
  Name: string;
  Host: string;
  Admin: string;
  Password: string;
};

export const DatabaseColumns = [
  "Id",
  "Name",
  "Host",
  "Admin",
  "Password"
] as const satisfies ReadonlyArray<keyof DatabaseColumns>;

export type DatabaseTable = Table<DatabaseColumns>;
