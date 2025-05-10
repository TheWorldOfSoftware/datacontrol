import DatabaseModule from "../../../modules/database.js";
import Route from "./index.js";
import type {
  MessageRequest,
  RequestSchema,
  ServerInstance
} from "../../types/server.js";
import Modules from "../../../modules/index.js";
import Repository from "../../../repositories/index.js";
import { parseDatabase } from "./schemas/database.js";
import { parseUUID, type UUIDSchema } from "./schemas/uuid.js";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

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

  public register(): void {
    this.instance.get("/", async (_req, res) => {
      const databases = await this.#databaseModule.getDatabases();
      res.send(databases);
    });
    this.instance.post("/", async (req, res) => {
      const database = parseDatabase(req.body);
      await this.#databaseModule.insertDatabase(database);
      res.status(201).send({ message: "Database created" });
    });
    this.instance
      .withTypeProvider<ZodTypeProvider>()
      .get(
        "/:database",
        async (
          req: MessageRequest<
            RequestSchema<unknown, unknown, { database: UUIDSchema }>
          >,
          res
        ) => {
          const databaseId = parseUUID(req.params?.database);
          const database = await this.#databaseModule.getDatabase(databaseId);
          res.send(database);
        }
      );
    this.instance
      .withTypeProvider<ZodTypeProvider>()
      .put(
        "/:database",
        async (
          req: MessageRequest<
            RequestSchema<unknown, unknown, { database: UUIDSchema }>
          >,
          res
        ) => {
          const database = parseDatabase(req.body);
          const databaseId = parseUUID(req.params?.database);
          await this.#databaseModule.updateDatabase(databaseId, database);
          res.status(200).send({ message: "Database updated" });
        }
      );
    this.instance
      .withTypeProvider<ZodTypeProvider>()
      .delete(
        "/:database",
        async (
          req: MessageRequest<
            RequestSchema<unknown, unknown, { database: UUIDSchema }>
          >,
          res
        ) => {
          const databaseId = parseUUID(req.params?.database);
          await this.#databaseModule.deleteDatabase(databaseId);
          res.status(200).send({ message: "Database deleted" });
        }
      );
  }
}
