import { Router } from "express";
import authRouter from "../api/auth/routes";
import adopterRouter from "../api/adopter/routes";
import petRouter from "../api/pet/routes";
import shelterRouter from "../api/shelter/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/adopter", adopterRouter);
apiRouter.use("/pets", petRouter);
apiRouter.use("/shelter", shelterRouter);

export default apiRouter;
