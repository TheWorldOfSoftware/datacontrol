import { ExitCode } from "../constants/exit-codes.js";
import envReader from "@worldofsoftware/dotenv-reader";
import fastify from "fastify";
import root from "./routes/v1/root.js";

const server = fastify({
  logger: true
});

server.register(root, { prefix: "/api/v1" });

const init = async (): Promise<void> => {
  try {
    const port = envReader.get("HOST_PORT");
    await server.listen({
      port: Number(port),
      listenTextResolver: () => `Server listening on port ${port}.`
    });
  } catch (error) {
    server.log.error(error);
    process.exit(ExitCode.SERVER_CRASH);
  }
};

export default {
  init
};
