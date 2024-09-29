import { z } from "zod";

const env = z.object({
  NODE_ENV: z
    .string()
    .refine((value): value is "development" | "production" =>
      ["development", "production"].includes(value)
    ),
  HOST_PORT: z.string().transform(value => Number(value)),
  MY_SQL_HOST: z.string(),
  MY_SQL_PORT: z.string(),
  MY_SQL_USERNAME: z.string(),
  MY_SQL_PASSWORD: z.string()
});

env.parse(process.env);

export interface NodeEnvExtension extends z.infer<typeof env> {};
