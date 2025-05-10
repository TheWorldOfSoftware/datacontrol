import type Database from "../models/database.js";
import type Module from "./module.js";
import type Repository from "../repositories/index.js";
import type { UUID } from "node:crypto";

export default class DatabaseModule implements Module {
  readonly #repository: Repository;

  public constructor(repository: Repository) {
    this.#repository = repository;
  }

  public init(): void {
    this.#repository.init();
  }

  public async getDatabases(): Promise<Database[]> {
    return await this.#repository.getDatabases();
  }

  public async getDatabase(databaseId: UUID): Promise<Database> {
    return await this.#repository.getDatabase(databaseId);
  }

  public async insertDatabase(datbase: Database): Promise<void> {
    await this.#repository.insertDatabase(datbase);
  }

  public async updateDatabase(id: UUID, database: Database): Promise<void> {
    await this.#repository.updateDatabase(id, database);
  }

  public async deleteDatabase(databaseId: UUID): Promise<void> {
    await this.#repository.deleteDatabase(databaseId);
  }
}
