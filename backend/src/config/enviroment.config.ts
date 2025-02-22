// LIBRARIES
import * as dotenv from "dotenv";
// INTERFACES
import { Config } from "../interfaces/config.interface";

dotenv.config();

const config: Config = {
    PORT: process.env.PORT || "3000",
    BACKPORT: process.env.BACKPORT || "8082",
    MONGO_URI: process.env.MONGO_URI || "",
    DATABASE: process.env.DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    DATA_SOURCE: process.env.DATA_SOURCE || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    SESSION_KEY: process.env.SESSION_KEY || "",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    SERVICE_NAME: process.env.SERVICE_NAME || "",
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    EMAIL_PORT: process.env.EMAIL_PORT || "",
    TEST_DATABASE: process.env.TEST_DATABASE,
    NODE_ENV: process.env.NODE_ENV || "dev",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET || "",  
    FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENT_ID || "",
    FACEBOOK_CLIENT_SECRET : process.env.FACEBOOK_CLIENT_SECRET || "",
};

export default config;
