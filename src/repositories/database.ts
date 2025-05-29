import type { UUID } from "node:crypto";
import type { DatabaseDTO } from "../dtos/database.js";
import MySQL from "./database-connectors/mysql/index.js";
import type Repository from "./repository.js";
import DTO from "../dtos/index.js";
import type { DatabaseTable } from "./tables/data-control/database.js";

export default class DatabaseRepository implements Repository {
  private readonly mysql: MySQL;

  public constructor(
    database = new MySQL(
      process.env.MY_SQL_HOST,
      {
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD
      },
      "data-control"
    )
  ) {
    this.mysql = database;
  }

  public init(): void {
    this.mysql.connect();
  }

  public async getDatabases(): Promise<DTO<DatabaseDTO>[]> {
    const [databases] = await this.mysql.select<DatabaseTable>("Database", [
      "*"
    ]);

    return databases.map(
      (database) =>
        new DTO<DatabaseDTO>(database.Id, {
          name: database.Name,
          host: database.Host,
          admin: database.Admin,
          password: database.Password
        })
    );
  }

  public async getDatabase(id: UUID): Promise<DTO<DatabaseDTO>> {
    const [databases] = await this.mysql.select<DatabaseTable>(
      "Database",
      ["Name", "Host", "Admin", "Password"],
      [["Id", id]]
    );

    if (databases[0] === undefined) {
      throw new Error("Database not found");
    }

    return new DTO<DatabaseDTO>(id, {
      name: databases[0].Name,
      host: databases[0].Host,
      admin: databases[0].Admin,
      password: databases[0].Password
    });
  }

  public async insertDatabase(database: DatabaseDTO): Promise<void> {
    await this.mysql.query(
      `INSERT INTO \`Database\` (Id, Name, Host, Admin, Password) VALUES (UUID_TO_BIN(UUID()), ${database.name}, ${database.host}, ${database.admin}, ${database.password});`
    );
  }

  public async updateDatabase(id: UUID, database: DatabaseDTO): Promise<void> {
    await this.mysql.query(
      `UPDATE \`Database\` SET Name = ${database.name}, Host = ${database.host}, Admin = ${database.admin}, Password = ${database.password} WHERE Id = UUID_TO_BIN(${id});`
    );
  }

  public async deleteDatabase(id: UUID): Promise<void> {
    await this.mysql.query(
      `DELETE FROM \`Database\` WHERE Id = UUID_TO_BIN(${id});`
    );
  }
}
