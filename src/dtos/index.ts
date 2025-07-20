import type { UUID } from "node:crypto";

export default class DTO<T extends Record<string, any>> {
  #id: UUID;

  public get id(): UUID {
    return this.#id;
  }

  #properties: T;

  public get properties(): T {
    return this.#properties;
  }

  public constructor(id: UUID, properties: T) {
    this.#id = id;
    this.#properties = Object.freeze(properties);
  }

  public toJSON(): Record<string, any> {
    return {
      id: this.#id,
      ...this.#properties
    };
  }
}
