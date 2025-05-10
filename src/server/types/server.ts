import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression
} from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import type { Http2Server } from "node:http2";

export type HttpServer = Http2Server;
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
