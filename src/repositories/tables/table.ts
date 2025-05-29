export default interface Table<
  TColumns extends Record<keyof TColumns, unknown>
> {
  Name: string;
  Columns: TColumns;
}
