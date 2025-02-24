// LIBRERIES
import express from "express";
import cluster from "cluster";
import { cpus } from "os";
// MANAGERS
import MongoManager from "../db/mongoManager";

/**
 * @class ExpressAppCreator
 * @description A class that creates and configures an Express application, with support for clustering.
 */
export default class ExpressAppCreator {
    private app: express.Application;
    private modeCluster: boolean;
    private PORT: number;

    /**
     * @constructor
     * @description Initializes the ExpressAppCreator instance.
     */
    constructor() {
        this.app = express();
        this.modeCluster = process.env.MODE === "CLUSTER";
        this.PORT = Number(process.env.BACKPORT) || 8082;
    }

    /**
     * @method createExpressApp
     * @description Creates and configures the Express application.
     * @returns {express.Application} The configured Express application.
     */
    public createExpressApp(): express.Application {
        MongoManager.connect();

        if (this.modeCluster && cluster.isPrimary) {
            this.setupCluster();
        } else {
            this.startServer();
        }

        return this.app;
    }

    /**
     * @method setupCluster
     * @description Sets up the cluster mode for the application.
     * @private
     */
    private setupCluster(): void {
        const numCPUS = cpus().length;
        console.log(`CPUs Quantity: ${numCPUS}`);
        console.log(`PID MASTER: ${process.pid}`);

        for (let i: number = 0; i < numCPUS; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker) => {
            console.log(
                "Worker",
                worker.process.pid,
                "died",
                new Date().toLocaleString()
            );
            cluster.fork();
        });
    }

    /**
     * @method startServer
     * @description Starts the Express server.
     * @private
     */
    private startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log(
                `Express server listening on port ${this.PORT} - PID WORKER ${process.pid}`
            );
        });
    }
}
