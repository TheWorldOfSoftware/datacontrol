import env from "./env.js";

env();

const server = await import("./server/index.js");

await server.default.init();
