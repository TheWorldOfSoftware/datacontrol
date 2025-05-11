import type { ServerInstance } from "../../types/server.js";

export default abstract class Route {
  #instance: ServerInstance;

  protected get instance(): ServerInstance {
    return this.#instance;
  }

  public constructor(instance: ServerInstance) {
    this.#instance = instance;
    this.register();
  }

  protected abstract register(): void;
}
