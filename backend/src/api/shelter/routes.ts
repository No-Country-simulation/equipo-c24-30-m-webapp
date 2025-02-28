import { Router } from "express";
import ShelterController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";

const shelterRouter = Router();

shelterRouter.get(
    "/:id",
    authenticate,
    authorizeRoles([Roles.SHELTER, Roles.ADMIN, Roles.ADOPTER]),
    ShelterController.getShelter
);


shelterRouter.post("/createAdoptionPost",
    authenticate,
    authorizeRoles([Roles.SHELTER, Roles.ADMIN]),
    ShelterController.CreateAdoptionPost
);

shelterRouter.put("/updateAdoptionPost",
    authenticate,
    authorizeRoles([Roles.SHELTER, Roles.ADMIN]),
    ShelterController.UpdateAdoptionPost
);

shelterRouter.delete("/deleteAdoptionPost",
    authenticate, 
    authorizeRoles([Roles.SHELTER, Roles.ADMIN]),  
    ShelterController.DeleteAdoptionPost
);


export default shelterRouter;
