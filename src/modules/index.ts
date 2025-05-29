import type Module from "./module.js";

export default class Modules {
  static #initializedModules = new Map<
    new (...args: any[]) => Module,
    Module
  >();

  public static get<T extends Module>(
    Module: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (!Modules.#initializedModules.has(Module)) {
      const newModule = new Module(...args);
      newModule.init();
      Modules.#initializedModules.set(Module, newModule);
    }

    return Modules.#initializedModules.get(Module) as T;
  }
}
