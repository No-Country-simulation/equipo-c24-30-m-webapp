import { Router } from "express";
import { Roles } from "../../constants/Roles";
import AdopterController from "./controller";

const adopterRouter = Router();

adopterRouter.get(
    "/:id",
    AdopterController.getAdopter
);


export default adopterRouter;
