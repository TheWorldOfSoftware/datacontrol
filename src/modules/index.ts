import type Module from "./module.js";

export default class Modules {
  static #initializedModules = new Map<
    new (...args: any[]) => Module,
    Module
  >();

  public static get<T extends Module>(
    module: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (!Modules.#initializedModules.has(module)) {
      const newModule = new module(...args);
      newModule.init();
      Modules.#initializedModules.set(module, newModule);
    }

    return Modules.#initializedModules.get(module) as T;
  }
}
