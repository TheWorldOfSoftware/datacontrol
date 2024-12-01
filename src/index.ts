import envLoader from "./env.js";
import envReader from "@worldofsoftware/dotenv-reader";

envReader.loadEnv();
envLoader.parse();
