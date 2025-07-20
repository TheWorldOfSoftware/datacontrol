import { escape } from "mysql2/promise";
import type { Tables } from "../../tables/data-control/index.js";
import type DatabaseConnector from "../database-connector.js";
import Pool from "./pool.js";

export default class MySQL implements DatabaseConnector {
  readonly #pool: Pool;

  public constructor(...args: Readonly<ConstructorParameters<typeof Pool>>) {
    this.#pool = new Pool(...args);
  }

  public async connect(): Promise<void> {
    this.#pool.connect();
  }

  public async disconnect(): Promise<void> {
    await this.#pool.disconnect();
  }

  public async insert<
    TTable extends Tables["Name"],
    TColumns extends Partial<Extract<Tables, { Name: TTable }>["Columns"]>
  >(
    table: TTable,
    data: TColumns,
    source?: string
  ): ReturnType<typeof Pool.prototype.query> {
    if (source === undefined) {
      this.#pool.throwIfDefaultDatabaseUndefined();
    }

    const [columns, values] = Object.entries(data).reduce(
      ([cols, vals], [key, value]) => {
        cols.push(escape(key));
        vals.push(escape(value));
        return [cols, vals];
      },
      [[], []] as [string[], string[]]
    );

    const query = `INSERT INTO ${source ? `\`${source}\`.` : ""}\`${table}\` (${columns.join()}) VALUES (${values.join()});`;

    return await this.#pool.query(query);
  }

  public async select<
    TTable extends Tables["Name"],
    TColumns extends Extract<Tables, { Name: TTable }>["Columns"],
    TColumnNames extends keyof TColumns,
    TWhere extends TColumns
  >(
    table: TTable,
    columns: (TColumnNames & string)[] | ["*"] = ["*"],
    where: [keyof TWhere & string, string][] = [],
    source?: string
  ): ReturnType<typeof Pool.prototype.query<Pick<TColumns, TColumnNames>>> {
    if (source === undefined) {
      this.#pool.throwIfDefaultDatabaseUndefined();
    }

    const filterWhere = where.reduce((filter, [key, value]) => {
      filter.push(`${escape(key)} = ${escape(value)}`);
      return filter;
    }, [] as string[]);

    const query = `SELECT ${columns.join()} FROM ${source ? `\`${source}\`.` : ""}\`${table}\`${
      where.length ? ` WHERE ${filterWhere.join(" AND ")}` : ""
    };`;

    return await this.#pool.query<TColumns>(query);
  }

  public async query<T>(
    query: string
  ): ReturnType<typeof Pool.prototype.query<T>> {
    return await this.#pool.query<T>(query);
  }
}
