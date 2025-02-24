// LIBRARIES
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { rootPath } from "../utils/path.utils";

/**
 * Configures the middleware for the Express application.
 * @param app - The Express application instance.
 */
export default class MiddlewareConfig {
    /**
     * Configures the middleware for the Express application.
     * @param app - The Express application instance.
     * @description This method sets up various middleware for the Express application, including:
     * - CORS configuration to allow cross-origin requests from the specified origin
     * - Serving static files from the "src/public" directory
     * - Parsing cookies
     * - Parsing JSON and URL-encoded request bodies
     * - Serving the Swagger UI for API documentation
     */
    static config(app: express.Application): void {
        app.use(
            cors({
                origin: "",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
                optionsSuccessStatus: 204,
                credentials: true,
                allowedHeaders: [
                    "Content-Type",
                    "Authorization",
                    "Content-Disposition",
                    "Access-Control-Allow-Origin",
                    "Access-Control-Allow-Credentials",
                ],
            })
        );
        app.use(express.static(path.join(process.cwd(), "src", "public")));
        app.use(cookieParser());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        const swaggerOptions = {
            definition: {
                openapi: "3.0.1",
                info: {
                    title: "Documentacion de Doggi",
                    description: "API de Doggi",
                    version: "1.0.0",
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        },
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
            },
            apis: [`${rootPath}/docs/**/*.yaml`],
        };

        const specs = swaggerJSDoc(swaggerOptions);
        app.use(
            "/apidocs",
            swaggerUiExpress.serve,
            swaggerUiExpress.setup(specs)
        );
    }
}
