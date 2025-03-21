import type { UUID } from "crypto";
import Database from "../models/database.js";
import MySQL from "./databases/mysql/index.js";
import envReader from "@worldofsoftware/dotenv-reader";

export default class Repository {
  private readonly mysql: MySQL;

  public constructor() {
    this.mysql = new MySQL(
      envReader.get("MY_SQL_HOST"),
      {
        username: envReader.get("MY_SQL_USERNAME"),
        password: envReader.get("MY_SQL_PASSWORD")
      },
      "data-control"
    );
  }

  public init(): void {
    this.mysql.connect();
  }

  public async getDatabases(): Promise<Database[]> {
    const [databases] = await this.mysql.query<{
      Id: UUID;
      Name: string;
      Host: string;
    }>(`SELECT BIN_TO_UUID(Id) AS Id, Name, Host FROM \`Database\`;`);

    return databases.map(
      (database) => new Database(database.Id, database.Name, database.Host)
    );
  }
}
