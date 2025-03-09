import { Router } from "express";
import AdoptionFormController from "./controller";

const router = Router();

router.post("/adoption-form", AdoptionFormController.createAdoptionForm);
router.put("/adoption-form/:id", AdoptionFormController.updateAdoptionForm);
router.get("/adoption-form/:id", AdoptionFormController.getAdoptionFormById);
router.post("/adoption-request", AdoptionFormController.createAdoptionRequest);

export default router;