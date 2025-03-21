import type { UUID } from "crypto";

export default class Database {
  #id: UUID;

  public get id(): UUID {
    return this.#id;
  }

  public host: string;

  public name: string;

  public constructor(id: UUID, host: string, name: string) {
    this.#id = id;
    this.host = host;
    this.name = name;
  }
}
