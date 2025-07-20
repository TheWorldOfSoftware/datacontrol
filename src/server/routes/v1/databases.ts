import DatabaseModule from "../../../modules/database.js";
import Route from "./route.js";
import type { ServerInstance } from "../../types/server.js";
import Modules from "../../../modules/index.js";
import {
  bodyDatabaseSchema,
  paramDatabaseIdSchema,
  updateDatabaseSchema
} from "./schemas/database.js";

export default class DatabaseRoute extends Route {
  #databaseModule: DatabaseModule;

  public constructor(
    instance: ServerInstance,
    databaseModule: DatabaseModule = Modules.get(DatabaseModule)
  ) {
    super(instance);
    this.#databaseModule = databaseModule;
  }

  protected register(): void {
    this.instance.get("/", async (_req, res) => {
      const databases = await this.#databaseModule.getDatabases();
      res.send(databases);
    });
    this.instance.post(
      "/",
      {
        schema: bodyDatabaseSchema
      },
      async (req, res) => {
        await this.#databaseModule.insertDatabase(req.body);
        res.status(201).send({ message: "Database created" });
      }
    );
    this.instance.get(
      "/:databaseId",
      {
        schema: paramDatabaseIdSchema
      },
      async (req, res) => {
        const database = await this.#databaseModule.getDatabase(
          req.params.databaseId
        );
        res.send(database);
      }
    );
    this.instance.put(
      "/:databaseId",
      {
        schema: updateDatabaseSchema
      },
      async (req, res) => {
        await this.#databaseModule.updateDatabase(
          req.params.databaseId,
          req.body
        );
        res.status(200).send({ message: "Database updated" });
      }
    );
    this.instance.delete(
      "/:databaseId",
      {
        schema: paramDatabaseIdSchema
      },
      async (req, res) => {
        await this.#databaseModule.deleteDatabase(req.params.databaseId);
        res.status(200).send({ message: "Database deleted" });
      }
    );
  }
}
