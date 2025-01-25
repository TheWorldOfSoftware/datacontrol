import type {
  FastifyRegister,
  FastifyReply,
  RouteShorthandMethod
} from "fastify";
import Repository from "../../../repositories/index.js";

const repository = new Repository();

repository.init();

const getDatabases = async function (
  _req: unknown,
  res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
): Promise<void> {
  const databases = await repository.getDatabases();
  res.send(databases);
};

const createDatabase = function (
  _req: unknown,
  res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
): void {
  res.send();
};

const getDatabase = function (
  _req: unknown,
  res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
): void {
  res.send();
};

const updateDatabase = function (
  _req: unknown,
  res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
): void {
  res.send();
};

const deleteDatabase = function (
  _req: unknown,
  res: Readonly<{ send: (payload?: unknown) => FastifyReply }>
): void {
  res.send();
};

export default (
  server: Readonly<{
    register: FastifyRegister;
    get: RouteShorthandMethod;
    post: RouteShorthandMethod;
    put: RouteShorthandMethod;
    delete: RouteShorthandMethod;
  }>
): void => {
  server.get("/", getDatabases);
  server.post("/", createDatabase);
  server.get("/:database", getDatabase);
  server.put("/:database", updateDatabase);
  server.delete("/:database", deleteDatabase);
};
