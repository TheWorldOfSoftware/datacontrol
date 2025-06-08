import { database, type Database } from "./database.js";
import { organisation, type Organisation } from "./organisation.js";

export type Tables = [
  {
    Name: "Database";
    Columns: Database;
  },
  {
    Name: "Organisation";
    Columns: Organisation;
  }
][number];

const tables = [
  {
    Name: "Database",
    Columns: database
  },
  {
    Name: "Organisation",
    Columns: organisation
  }
] as const satisfies ReadonlyArray<{
  Name: Tables["Name"];
  Columns: ReadonlyArray<Tables["Columns"][keyof Tables["Columns"]]>;
}>;

export default tables;
