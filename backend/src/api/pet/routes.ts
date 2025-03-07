import { Router } from "express";
import PetController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import { petCreatePayloadValidator, petUpdatePayloadValidator } from "./validator";


const petRouter = Router();


petRouter.post(
    "/",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    schemaValidator(petCreatePayloadValidator, null), 
    PetController.createPet
);
petRouter.put(
    "/:id",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    schemaValidator(petUpdatePayloadValidator, null), 
    PetController.updatePet
);
petRouter.delete(
    "/:id", 
    authenticate, 
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]), 
    PetController.deletePet
);

petRouter.get("/:id",
    PetController.getPet
);
petRouter.get("/", 
    PetController.getAllPets
);
petRouter.get("/shelter/:shelterId", 
    PetController.getPetsByShelter
);

export default petRouter;