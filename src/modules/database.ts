import type Database from "../models/database.js";
import type Module from "./module.js";
import type Repository from "../repositories/index.js";

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
}
