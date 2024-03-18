import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

const {
  APP_PORT,
  APP_NAME,
  APP_URL,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_HOST,
  DB_SSL,
  JWT_SECRET,
  JWT_EXPIRATION,
} = process.env;
export const environment = {
  // * Application
  APP_PORT: APP_PORT || 3000,
  APP_NAME: APP_NAME || "APP NAME",
  APP_URL: APP_URL || "",

  // * Database
  DB_USER: DB_USER || "",
  DB_PASSWORD: DB_PASSWORD || "",
  DB_NAME: DB_NAME || "",
  DB_PORT: DB_PORT || 0,
  DB_HOST: DB_HOST || "",
  DB_SSL: DB_SSL === "true",

  // * JWT
  JWT_SECRET: JWT_SECRET || "SECRET",
  JWT_EXPIRATION: JWT_EXPIRATION || "10h",
};
