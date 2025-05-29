import { DatabaseColumns } from "./database.js";
import { OrganisationColumns } from "./organisation.js";

const tables = [
  {
    Name: "Database",
    Columns: DatabaseColumns
  },
  {
    Name: "Organisation",
    Columns: OrganisationColumns
  }
] as const satisfies ReadonlyArray<{
  Name: string;
  Columns: ReadonlyArray<string>;
}>;

export default tables;
export type Tables = (typeof tables)[number];
