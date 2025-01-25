import envLoader from "./env.js";
import envReader from "@worldofsoftware/dotenv-reader";

envReader.loadEnv();
envLoader.parse();

const server = await import("./server/index.js");

await server.default.init();
