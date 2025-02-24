import { Router } from "express";
import authRouter from "../api/auth/routes";
import adopterRouter from "../api/adopter/routes";
import petRouter from "../api/pet/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/adopter", adopterRouter);
apiRouter.use("/pets", petRouter);

export default apiRouter;
