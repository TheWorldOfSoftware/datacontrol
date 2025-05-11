import fastify, { type FastifyPluginOptions } from "fastify";
import { ExitCode } from "../constants/exit-codes.js";
import envReader from "@worldofsoftware/dotenv-reader";
import RootRoute from "./routes/v1/root.js";
import type { HttpServer, ServerInstance } from "./types/server.js";
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";

export default class Server {
  readonly #server: ServerInstance;

  public constructor() {
    this.#server = fastify({
      logger: true
    })
      .register<FastifyPluginOptions, HttpServer>(
        (instance) => new RootRoute(instance),
        {
          prefix: "/api/v1"
        }
      )
      .setValidatorCompiler(validatorCompiler)
      .setSerializerCompiler(serializerCompiler);
  }

  public async init(): Promise<void> {
    try {
      const port = envReader.get("HOST_PORT");
      await this.#server.listen({
        port: Number(port),
        listenTextResolver: () => `Server listening on port ${port}.`
      });
    } catch (error) {
      this.#server.log.error(error);
      process.exit(ExitCode.SERVER_CRASH);
    }
  }
}
