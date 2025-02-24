import { Router } from "express";
import PetController from "./controller";


const petRouter = Router();

// TODO implement authenticate middleware for post put & delete endpoints

petRouter.post("/", PetController.createPet);
petRouter.get("/:id", PetController.getPet);
petRouter.get("/", PetController.getAllPets);
petRouter.put("/:id", PetController.updatePet);
petRouter.delete("/:id", PetController.deletePet);

export default petRouter;