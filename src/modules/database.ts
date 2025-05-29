import type { DatabaseDTO } from "../dtos/database.js";
import DatabaseRepository from "../repositories/database.js";
import type DTO from "../dtos/index.js";
import type Module from "./module.js";
import type { UUID } from "node:crypto";

export default class DatabaseModule implements Module {
  readonly #repository: DatabaseRepository;

  public constructor(
    repository: DatabaseRepository = new DatabaseRepository()
  ) {
    this.#repository = repository;
  }

  public init(): void {
    this.#repository.init();
  }

  public async getDatabases(): Promise<DTO<DatabaseDTO>[]> {
    return await this.#repository.getDatabases();
  }

  public async getDatabase(databaseId: UUID): Promise<DTO<DatabaseDTO>> {
    return await this.#repository.getDatabase(databaseId);
  }

  public async insertDatabase(database: DatabaseDTO): Promise<void> {
    await this.#repository.insertDatabase(database);
  }

  public async updateDatabase(id: UUID, database: DatabaseDTO): Promise<void> {
    await this.#repository.updateDatabase(id, database);
  }

  public async deleteDatabase(databaseId: UUID): Promise<void> {
    await this.#repository.deleteDatabase(databaseId);
  }
}
