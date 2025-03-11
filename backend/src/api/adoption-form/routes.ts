import { Router } from "express";
import FormController from "../adoption-form/controller";
import authorizeRoles from "../../middleware/authorization.middleware";
import authenticate from "../../middleware/authenticate.middleware";
import { Roles } from "../../constants/Roles";
const adoptionFormRouter = Router();

adoptionFormRouter.post(
    "/",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    FormController.createForm
);  

adoptionFormRouter.get(
    "/getFormByShelter/:id",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER, Roles.ADOPTER]),
    FormController.getFormByShelterId
);  

adoptionFormRouter.put(
    "/",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    FormController.updateForm
); 

adoptionFormRouter.delete(
    "/",
    authenticate,
    authorizeRoles([Roles.ADMIN, Roles.SHELTER]),
    FormController.deleteForm
); 


export default adoptionFormRouter;