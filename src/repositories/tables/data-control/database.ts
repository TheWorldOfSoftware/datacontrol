import type { UUID } from "node:crypto";
import type Table from "../table.js";

type DatabaseColumns = {
  Id: UUID;
  Name: string;
  Host: string;
  Admin: string;
  Password: string;
};

export type DatabaseTable = Table<DatabaseColumns>;
