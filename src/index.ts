import Server from "./server/index.js";
import env from "./env.js";

env();

const server = new Server();

await server.init();
