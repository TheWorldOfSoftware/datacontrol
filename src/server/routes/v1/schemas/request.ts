import { z } from "zod";

const requestSchema = z.object({
  headers: z.unknown().optional(),
  body: z.unknown().optional(),
  querystring: z.unknown().optional(),
  params: z.record(z.string()).optional(),
  response: z.unknown().optional()
});

export type RequestSchema = z.infer<typeof requestSchema>;
