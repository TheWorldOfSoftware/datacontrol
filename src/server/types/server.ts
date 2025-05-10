import type {
  FastifyInstance,
  FastifyRequest,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression
} from "fastify";
import type { Http2Server } from "node:http2";

export type HttpServer = Http2Server;
type RequestExpression = RawRequestDefaultExpression<HttpServer>;
type ResponseExpression = RawReplyDefaultExpression<HttpServer>;

type RequestContent<
  Body extends unknown = unknown,
  Query extends unknown = unknown,
  Params extends unknown = unknown,
  Headers extends unknown = unknown
> = {
  Body?: Body;
  Querystring?: Query;
  Params?: Params;
  Headers?: Headers;
};

export type RequestSchema<
  Body extends unknown = unknown,
  Query extends unknown = unknown,
  Params extends unknown = unknown,
  Headers extends unknown = unknown,
  Response extends unknown = unknown
> = {
  body: Body;
  querystring: Query;
  params: Params;
  headers: Headers;
  response: Response;
};

export type MessageRequest<Schema extends FastifySchema> = FastifyRequest<
  RequestContent<unknown, unknown, Schema["params"]>,
  HttpServer,
  RequestExpression,
  Schema
>;

export type ServerInstance = FastifyInstance<
  HttpServer,
  RequestExpression,
  ResponseExpression
>;
