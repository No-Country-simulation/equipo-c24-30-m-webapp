// LIBRARIES
import mongoose from "mongoose";
// CONFIGS
import DB_CONFIG from "../config/db.config";

/**
 * Manages the connection to a MongoDB database using the Mongoose library.
 * This class is a singleton, ensuring there is only one instance of the MongoDB connection.
 * It connects to the MongoDB database using the configuration settings from the `db.config.ts` file.
 * If the connection is successful, it logs a success message. If there is an error, it logs the error and throws an exception.
 */
export default class MongoManager {
    private static _instance: MongoManager | null = null;

    private constructor() {
        mongoose.set("strictQuery", false);
        const mongoUri = DB_CONFIG.mongo.uri;
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined.");
        }

        mongoose.connect(mongoUri);

        const db = mongoose.connection;

        db.on("error", (error) => {
            console.log(`db connection failed: ${error}`);
            throw error;
        });

        db.once("open", () => {
            console.log("db connection succeeded");
        });
    }

    public static connect(): MongoManager {
        if (!MongoManager._instance) {
            MongoManager._instance = new MongoManager();
        }
        return MongoManager._instance;
    }
}
