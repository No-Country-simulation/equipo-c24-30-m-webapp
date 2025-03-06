import { Router } from "express";
import authRouter from "../api/auth/routes";
import adopterRouter from "../api/adopter/routes";
import petRouter from "../api/pet/routes";
import shelterRouter from "../api/shelter/routes";
import adminRouter from "../api/admin/routes";
import adoptionRequestRouter from "../api/adoption-request/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/adopter", adopterRouter);
apiRouter.use("/pet", petRouter);
apiRouter.use("/shelter", shelterRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/adoptionRequest", adoptionRequestRouter);

export default apiRouter;
