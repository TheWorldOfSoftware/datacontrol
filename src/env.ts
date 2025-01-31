import envReader from "@worldofsoftware/dotenv-reader";
import { z } from "zod";

const env = z.object({
  HOST_PORT: z.string().regex(/^\d{1,4}$/u),
  MY_SQL_HOST: z.string(),
  MY_SQL_PASSWORD: z.string(),
  MY_SQL_PORT: z.string(),
  MY_SQL_USERNAME: z.string(),
  NODE_ENV: z
    .string()
    .refine((value): value is "development" | "production" =>
      ["development", "production"].includes(value)
    )
});

export type NodeEnvExtension = z.infer<typeof env>;

export default function (): NodeEnvExtension {
  envReader.loadEnv();
  return env.parse(process.env);
}
