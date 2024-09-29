import type { NodeEnvExtension } from "./src/index.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeEnvExtension {}
  }
}
