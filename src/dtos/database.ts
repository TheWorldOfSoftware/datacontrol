import type { UUID } from "node:crypto";

export type DatabaseDTO = {
  organisationId: UUID;
  host: string;
  name: string;
  admin: string;
  password: string;
};
