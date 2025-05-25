import envReader from "@worldofsoftware/dotenv-reader";
import Server from "./server/index.js";
import envSchema from "./env.js";

envReader.load(envSchema);

const server = new Server();

await server.init();
