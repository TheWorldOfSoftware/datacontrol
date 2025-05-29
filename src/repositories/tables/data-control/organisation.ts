import type { UUID } from "node:crypto";
import type Table from "../table.js";

type OrganisationColumns = {
  Id: UUID;
  Name: string;
  Image: string;
};

export const OrganisationColumns = [
  "Id",
  "Name",
  "Image"
] as const satisfies ReadonlyArray<keyof OrganisationColumns>;

export type OrganisationTable = Table<OrganisationColumns>;
