import type { UUID } from "node:crypto";

export type Database = {
  Id: UUID;
  Name: string;
  Host: string;
  Admin: string;
  Password: string;
};
