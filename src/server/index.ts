import { ExitCode } from "../constants/exit-codes.js";
import fastify from "fastify";

const server = fastify({
  logger: true
});

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
