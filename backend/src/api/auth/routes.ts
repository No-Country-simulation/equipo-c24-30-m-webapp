import { Router } from "express";

import AuthController from "./controller";

const authRouter = Router();

authRouter.post(
    "/register",
    AuthController.register
);

authRouter.post(
    "/login",
    AuthController.login
);


export default authRouter;
