import type Database from "../models/database.js";
import MySQL from "./databases/mysql/index.js";
import envReader from "@worldofsoftware/dotenv-reader";

export default class Repository {
  private readonly mysql: MySQL;

  public constructor() {
    this.mysql = new MySQL(envReader.get("MY_SQL_HOST"), {
      username: envReader.get("MY_SQL_USERNAME"),
      password: envReader.get("MY_SQL_PASSWORD")
    });
  }

  public init(): void {
    this.mysql.connect();
  }

  public async getDatabases(): Promise<Database[]> {
    const [databases] = await this.mysql.query<Database[]>(
      `SELECT * FROM \`Database\`;`
    );

    return databases;
  }
}
