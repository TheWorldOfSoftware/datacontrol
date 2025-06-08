import type { UUID } from "node:crypto";

export type Organisation = {
  Id: UUID;
  Name: string;
  Image: string;
};

export const organisation = [
  "Id",
  "Name",
  "Image"
] as const satisfies ReadonlyArray<keyof Organisation>;
