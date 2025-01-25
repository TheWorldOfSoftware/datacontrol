import type Database from "../database.js";
import Pool from "./pool.js";

export default class MySQL implements Database {
  readonly #pool: Pool;

  public constructor(...args: Readonly<ConstructorParameters<typeof Pool>>) {
    this.#pool = new Pool(...args);
  }

  public connect(): void {
    this.#pool.connect();
  }

  public async disconnect(): Promise<void> {
    this.#pool.throwIfUndefined();

    await this.#pool.disconnect();
  }

  public async query<T>(
    query: string
  ): Promise<ReturnType<typeof Pool.prototype.query<T>>> {
    this.#pool.throwIfUndefined();

    return await this.#pool.query<T>(query);
  }
}
