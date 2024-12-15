import type { FastifyInstance } from "fastify";

export default class DatabasesRouter {
  private static getDatabases(_req, res): void {
    res.send();
  }

  public static register(server: FastifyInstance): void {
    server.get("/", DatabasesRouter.getDatabases);
  }
}
