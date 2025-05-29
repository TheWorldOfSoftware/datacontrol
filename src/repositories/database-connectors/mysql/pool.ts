import mysql, {
  type FieldPacket,
  type Pool,
  type PoolOptions,
  type RowDataPacket
} from "mysql2/promise";
import type { Credentials } from "../../../types/credentials.js";

export default class PoolWrapper {
  readonly #config: PoolOptions;

  #pool?: Pool;

  public constructor(
    host: string,
    { username, password }: Readonly<Credentials>,
    defaultDatabase?: string
  ) {
    this.#config = {
      host,
      password,
      user: username
    };

    if (defaultDatabase !== undefined) this.#config.database = defaultDatabase;
  }

  public connect(): void {
    this.#pool = mysql.createPool(this.#config);
  }

  public async disconnect(): Promise<void> {
    await this.#pool?.end();
  }

  public async query<T>(
    query: string
  ): Promise<[(T & RowDataPacket)[], FieldPacket[]]> {
    if (this.#pool === undefined) {
      throw new Error("No connection available.");
    }

    return await this.#pool.query<(T & RowDataPacket)[]>(query);
  }

  public throwIfUndefined(): void {
    if (this.#pool === undefined) {
      throw new Error("No connection to disconnect.");
    }
  }
}
