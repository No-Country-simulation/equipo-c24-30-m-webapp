import { Router } from "express";
import { Roles } from "../../constants/Roles";
import ShelterController from "./controller";

const shelterRouter = Router();

shelterRouter.get(
    "/:id",
    ShelterController.getShelter
);


export default shelterRouter;
