import { Router } from "express";
// import authenticate from "../../middleware/authenticate.middleware";
// import authorizeRoles from "../../middleware/authorization.middleware";
import { Roles } from "../../constants/Roles";
import AdopterController from "./controller";
// import schemaValidator from "../../middleware/schemaValidators.middlewares";
// import {
//     authorizeDoctorPayloadValidator,
//     adopterUpdatePayloadValidator,
// } from "./validator";
// import { uploadFields } from "../../middleware/uploadFields.middlewares";
// import { mongoIdValidator } from "../../generalValidator/idValidator";

const adopterRouter = Router();

// adopterRouter.get(
//     "/:id",
//     authenticate,
//     AdopterController.getAdopter
// );

// adopterRouter.put(
//     "/",
//     authenticate,
//     uploadFields,
//     AdopterController.update
// );


export default adopterRouter;
