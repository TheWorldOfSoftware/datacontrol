import type { Tables } from "../../tables/data-control/index.js";
import tables from "../../tables/data-control/index.js";
import type DatabaseConnector from "../database-connector.js";
import Pool from "./pool.js";

export default class MySQL implements DatabaseConnector {
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

  public async select<
    TTable extends Tables["Name"],
    TTableExtract extends Extract<Tables, { Name: TTable }>["Columns"],
    TColumnNames extends keyof TTableExtract,
    TWhere extends TTableExtract
  >(
    source: TTable,
    columns: (TColumnNames & string)[] | ["*"] = ["*"],
    where?: [keyof TWhere & string, string][]
  ): ReturnType<
    typeof Pool.prototype.query<Pick<TTableExtract, TColumnNames>>
  > {
    this.#pool.throwIfUndefined();

    const select =
      columns[0] === "*"
        ? tables
            .find((database) => database.Name === source)!
            .Columns.map((column) =>
              column.endsWith("Id")
                ? `BIN_TO_UUID(${column}) AS ${column}`
                : column
            )
        : columns.map((column) =>
            column.endsWith("Id")
              ? `BIN_TO_UUID(${column}) AS ${column}`
              : `${column}`
          );

    const query = `SELECT ${select.join()} FROM \`data-control\`.\`${source}\`${
      where?.length
        ? ` WHERE ${where
            .map(([key, value]) => `\`${key}\` = '${value}'`)
            .join(" AND ")}`
        : ""
    };`;

    console.log("DEBUG:", query);

    return await this.#pool.query<TTableExtract>(query);
  }

  // public async insert<T extends Record<string, unknown>>(
  //   source: string,
  //   data: T
  // ): ReturnType<typeof Pool.prototype.query<T>> {
  //   this.#pool.throwIfUndefined();

  //   const columns = Object.keys(data).map((key) => `\`${key}\``).join(", ");
  //   const values = Object.values(data)
  //     .map((value) => (typeof value === "string" ? `'${value}'` : value))
  //     .join(", ");

  //   const query = `INSERT INTO \`data-control\`.\`${source}\` (${columns}) VALUES (${values});`;

  //   return await this.#pool.query<T>(query);
  // }

  public async query<T>(
    query: string
  ): ReturnType<typeof Pool.prototype.query<T>> {
    this.#pool.throwIfUndefined();

    return await this.#pool.query<T>(query);
  }
}
