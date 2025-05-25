import type { DatabaseDTO } from "../dtos/database.js";
import type Module from "./module.js";
import DatabaseRepository from "../repositories/database.js";
import type { UUID } from "node:crypto";
import type DTO from "../dtos/index.js";

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

  public async insertDatabase(datbase: DTO<DatabaseDTO>): Promise<void> {
    await this.#repository.insertDatabase(datbase);
  }

  public async updateDatabase(
    id: UUID,
    database: DTO<DatabaseDTO>
  ): Promise<void> {
    await this.#repository.updateDatabase(id, database);
  }

  public async deleteDatabase(databaseId: UUID): Promise<void> {
    await this.#repository.deleteDatabase(databaseId);
  }
}
