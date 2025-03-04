import { Router } from "express";
import { Roles } from "../../constants/Roles";
import UserController from "./controller";
import authenticate from "../../middleware/authenticate.middleware";
import authorizeRoles from "../../middleware/authorization.middleware";
import schemaValidator from "../../middleware/schemaValidators.middlewares";
import AdminController from "./controller";

const adminRouter = Router();

adminRouter.get(
    "/users",
    authenticate,
    authorizeRoles([Roles.ADMIN]),
    AdminController.getAllUsers
);




export default adminRouter;
