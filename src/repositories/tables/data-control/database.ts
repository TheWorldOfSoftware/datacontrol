import type { UUID } from "node:crypto";

export type Database = {
  Id: UUID;
  OrganisationId: UUID;
  Name: string;
  Host: string;
  Admin: string;
  Password: string;
};
