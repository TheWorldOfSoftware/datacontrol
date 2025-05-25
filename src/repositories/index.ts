import type { UUID } from "node:crypto";
import Database from "../models/database.js";
import MySQL from "./databases/mysql/index.js";

export default class Repository {
  private readonly mysql: MySQL;

  public constructor() {
    this.mysql = new MySQL(
      process.env.MY_SQL_HOST,
      {
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD
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

  public async getDatabase(databaseId: UUID): Promise<Database> {
    const [databases] = await this.mysql.query<{
      Id: UUID;
      Name: string;
      Host: string;
    }>(
      `SELECT BIN_TO_UUID(Id) AS Id, Name, Host FROM \`Database\` WHERE Id = ${databaseId};`
    );

    if (databases[0] === undefined) {
      throw new Error("Database not found");
    }

    return new Database(databases[0].Id, databases[0].Name, databases[0].Host);
  }

  public async insertDatabase(database: Database): Promise<void> {
    await this.mysql.query(
      `INSERT INTO \`Database\` (Id, Name, Host) VALUES (UUID_TO_BIN(${database.id}), ${database.name}, ${database.host});`
    );
  }

  public async updateDatabase(id: UUID, database: Database): Promise<void> {
    await this.mysql.query(
      `UPDATE \`Database\` SET Name = ${database.name}, Host = ${database.host} WHERE Id = UUID_TO_BIN(${id});`
    );
  }

  public async deleteDatabase(databaseId: UUID): Promise<void> {
    await this.mysql.query(
      `DELETE FROM \`Database\` WHERE Id = UUID_TO_BIN(${databaseId});`
    );
  }
}
