import type { UUID } from "node:crypto";

export type Organisation = {
  Id: UUID;
  Name: string;
  Image: string;
};
