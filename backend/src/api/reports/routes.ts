import { Router } from "express";
import ReportController from "./controller";

const reportRouter = Router();

// TODO: Implement authentication middleware for POST, PUT & DELETE endpoints.
// TODO: In the update endpoint, add middleware to check that only an admin can perform the update.

reportRouter.post("/", ReportController.createReport);
reportRouter.get("/:id", ReportController.getReport);
reportRouter.get("/", ReportController.getAllReports);
reportRouter.put("/:id", ReportController.updateReport);
reportRouter.delete("/:id", ReportController.deleteReport);

export default reportRouter;
