import { Router } from "express";
import { Roles } from "../../constants/Roles";
import AdopterController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import {adopterUpdatePayloadValidator} from "./validator";

const adopterRouter = Router();

adopterRouter.get(
    "/:id",
    AdopterController.getAdopter
);

adopterRouter.put(
    "/:id", 
    authenticate,
    authorizeRoles([Roles.ADOPTER, Roles.ADMIN]),
    schemaValidator(adopterUpdatePayloadValidator, null),
    AdopterController.updateAdopter
);


export default adopterRouter;
