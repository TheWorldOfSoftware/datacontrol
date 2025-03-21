import type { FastifyReply } from "fastify";
import DatabaseModule from "../../../modules/database.js";
import Route from "./index.js";
import type { ServerInstance } from "../../types/server.js";
import Modules from "../../../modules/index.js";
import Repository from "../../../repositories/index.js";

export default class DatabaseRoute extends Route {
  #databaseModule: DatabaseModule;

  public constructor(
    instance: ServerInstance,
    databaseModule: DatabaseModule = Modules.get(
      DatabaseModule,
      new Repository()
    )
  ) {
    super(instance);
    this.#databaseModule = databaseModule;
  }

  private async getDatabases(
    _req: unknown,
    res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
  ): Promise<void> {
    const databases = await this.#databaseModule.getDatabases();
    res.send(databases);
  }

  private createDatabase(
    _req: unknown,
    res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
  ): void {
    res.send();
  }

  private getDatabase(
    _req: unknown,
    res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
  ): void {
    res.send();
  }

  private updateDatabase(
    _req: unknown,
    res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
  ): void {
    res.send();
  }

  private deleteDatabase(
    _req: unknown,
    res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
  ): void {
    res.send();
  }

  public register(): void {
    this.instance.get("/", (req, res) => this.getDatabases(req, res));
    this.instance.post("/", (req, res) => this.createDatabase(req, res));
    this.instance.get("/:database", (req, res) => this.getDatabase(req, res));
    this.instance.put("/:database", (req, res) =>
      this.updateDatabase(req, res)
    );
    this.instance.delete("/:database", (req, res) =>
      this.deleteDatabase(req, res)
    );
  }
}
