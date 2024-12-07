import envLoader from "./env.js";
import envReader from "@worldofsoftware/dotenv-reader";
import server from "./server/index.js";

envReader.loadEnv();
envLoader.parse();

await server.init();
