import { ExitCode } from "../constants/exit-codes.js";
import fastify from "fastify";
import V1Router from "./routes/v1/index.js";

const server = fastify({
  logger: true
});

server.register(V1Router.register, { prefix: "/api/v1" });

const init = async (): Promise<void> => {
  try {
    const port = process.env.HOST_PORT;
    await server.listen({
      port: Number(port),
      listenTextResolver: () => `Server listening on port ${port}.`
    });
  } catch (error) {
    server.log.error(error);
    process.exit(ExitCode.serverCrash);
  }
};

export default {
  init
};
