import type Database from "../models/database.js";
import type Repository from "../repositories/index.js";

export default class DatabaseModule {
  private readonly repository: Repository;

  public constructor(repository: Repository) {
    this.repository = repository;
  }

  public async getDatabases(): Promise<Database[]> {
    return await this.repository.getDatabases();
  }
}
