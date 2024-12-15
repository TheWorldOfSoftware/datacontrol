import type { FastifyInstance } from "fastify";
import DatabasesRouter from "./databases/index.js";

export default class Router {
  public static register(server: FastifyInstance): void {
    server.register(DatabasesRouter.register, { prefix: "/databases" });
  }
}
