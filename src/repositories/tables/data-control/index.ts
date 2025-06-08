import type { Database } from "./database.js";
import type { Organisation } from "./organisation.js";

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
