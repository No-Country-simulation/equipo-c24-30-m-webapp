import { Router } from "express";
import PetController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";


const petRouter = Router();


petRouter.post(
    "/",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]), 
    PetController.createPet
);
petRouter.put(
    "/:id",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    PetController.updatePet
);
petRouter.delete(
    "/:id", 
    authenticate, 
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]), 
    PetController.deletePet
);

petRouter.get("/:id", PetController.getPet);
petRouter.get("/", PetController.getAllPets);
petRouter.get("/shelter/:shelterId", PetController.getPetsByShelter);

export default petRouter;