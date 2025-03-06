import { Router } from "express";
import { Roles } from "../../constants/Roles";

import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import AdopterController from "../adopter/controller";
import AdoptionRequestController from "./controller";

const adoptionRequestRouter = Router();

adoptionRequestRouter.post(
    "/",
    authenticate,
    authorizeRoles([Roles.ADOPTER]),
    AdoptionRequestController.createAdoptionRequest
);

adoptionRequestRouter.get(
    "/",
    authenticate,
    authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
    AdoptionRequestController.getAllAdoptionRequests
);

adoptionRequestRouter.get(
    "/:id",
    authenticate,
    authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
    AdoptionRequestController.getAdoptionRequest
);

adoptionRequestRouter.delete(
    "/:id",
    authenticate,
    authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
    AdoptionRequestController.deleteAdoptionRequest
);

adoptionRequestRouter.put(
    "/:id",
    authenticate,
    authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
    AdoptionRequestController.updateAdoptionRequest
);


export default adoptionRequestRouter;
