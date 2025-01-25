import type { FastifyRegister } from "fastify";
import databases from "./databases.js";

export default (server: Readonly<{ register: FastifyRegister }>): void => {
  server.register(databases, { prefix: "/databases" });
};
