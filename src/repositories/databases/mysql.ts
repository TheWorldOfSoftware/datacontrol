import mysql, { type Pool, type PoolOptions } from "mysql2/promise";
import type { Credentials } from "../../types/credentials.js";
import type Database from "./database.js";

export default class MySQL implements Database {
  readonly #config: PoolOptions;

  #pool?: Pool;

  public constructor(
    host: string,
    { username, password }: Readonly<Credentials>
  ) {
    this.#config = {
      host,
      password,
      user: username
    };
  }

  public async connect(): Promise<void> {
    this.#pool = mysql.createPool(this.#config);
    await this.#pool.connect();
  }

  public async disconnect(): Promise<void> {
    if (this.#pool === undefined) {
      throw new Error("No connection to disconnect.");
    }

    await this.#pool.end();
  }
}
