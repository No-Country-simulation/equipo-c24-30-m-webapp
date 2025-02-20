// LIBRARIES
import express from "express";
// CONFIGS
import ExpressAppCreator from "./config/createApp";
import MiddlewaresConfig from "./config/middlewares.config";
// ROUTERS
import apiRouter from "./routers";

const appCreator = new ExpressAppCreator();
const app: express.Application = appCreator.createExpressApp();

MiddlewaresConfig.config(app);

app.use("/api", apiRouter);

export default app;
