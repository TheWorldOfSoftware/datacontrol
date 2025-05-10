import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression
} from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import type { Server } from "node:http";

export type HttpServer = Server;
type RequestExpression = RawRequestDefaultExpression<HttpServer>;
type ResponseExpression = RawReplyDefaultExpression<HttpServer>;
type Logger = FastifyBaseLogger;

export type ServerInstance = FastifyInstance<
  HttpServer,
  RequestExpression,
  ResponseExpression,
  Logger,
  ZodTypeProvider
>;
