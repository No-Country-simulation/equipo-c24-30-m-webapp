// INTERFACES
import { DBConfig } from "../interfaces/config.interface";
// ENVIROMENT VARIABLES
import config from "./enviroment.config";

const { MONGO_URI, DATABASE, TEST_DATABASE, NODE_ENV } = config;

const databaseName = NODE_ENV === "test" ? TEST_DATABASE : DATABASE;

const DB_CONFIG: DBConfig = {
    mongo: {
        uri: MONGO_URI
            ? `${MONGO_URI}/${databaseName}?retryWrites=true&w=majority`
            : null,
    },
};

export default DB_CONFIG;
