import { Router } from "express";
import { Roles } from "../../constants/Roles";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import AdoptionRequestController from "./controller";
import {
  adoptionRequestCreatePayloadValidator,
  adoptionRequestUpdatePayloadValidator,
} from "./validator";

const adoptionRequestRouter = Router();

adoptionRequestRouter.post(
  "/",
  authenticate,
  authorizeRoles([Roles.ADOPTER]),
  schemaValidator(adoptionRequestCreatePayloadValidator, null),
  AdoptionRequestController.createAdoptionRequest
);

adoptionRequestRouter.get(
  "/filter/",
  authenticate,
  authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
  AdoptionRequestController.getAdoptionRequestsByFilter
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
  schemaValidator(adoptionRequestUpdatePayloadValidator, null),
  AdoptionRequestController.updateAdoptionRequest
);

export default adoptionRequestRouter;
