import { Router } from "express";
import ReportController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import {
  reportCreatePayloadValidator,
  reportUpdatePayloadValidator,
} from "./validator";

const reportRouter = Router();

// maybe unaunthenticateds should be able to make a report?
reportRouter.post(
  "/",
  authenticate,
  authorizeRoles([Roles.ADOPTER, Roles.ADMIN, Roles.SHELTER]),
  schemaValidator(reportCreatePayloadValidator, null),
  ReportController.createReport
);

reportRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles([Roles.ADMIN]),
  ReportController.deleteReport
);

reportRouter.put(
  "/:id",
  authenticate,
  authorizeRoles([Roles.ADMIN]),
  schemaValidator(reportUpdatePayloadValidator, null),
  ReportController.updateReport
);

reportRouter.get("/:id", authenticate, ReportController.getReport);
reportRouter.get("/", authenticate, ReportController.getAllReports);

export default reportRouter;
