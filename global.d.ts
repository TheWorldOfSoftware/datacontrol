import type { NodeEnvExtension } from "./src/env.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeEnvExtension {}
  }
}
