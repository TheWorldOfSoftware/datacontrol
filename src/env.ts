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
    ),
  DC_UserAdmin_Username: z.string(),
  DC_UserAdmin_Password: z.string(),
  DC_UsernameRead_Username: z.string(),
  DC_UsernameRead_Password: z.string(),
  DC_PasswordRead_Username: z.string(),
  DC_PasswordRead_Password: z.string()
});

export type NodeEnvExtension = z.infer<typeof env>;

export default function (): NodeEnvExtension {
  envReader.loadEnv();
  return env.parse(process.env);
}
