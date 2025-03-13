// MODELS
import Admin from "./model";
// DAOS
import UserDAO from "../user/dao";
// Add this line to import AdopterDAO
// DTOS
import AdminDTO from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
// INTERFACES
import {
  IAdmin,
  AdminCreateFields,
  AdminResponse,
  AdminUpdateFields,
} from "./interface";

export default class AdminService {
  static async createAdmin(
    admin: AdminCreateFields
  ): Promise<Partial<AdminResponse>> {
    try {
      const adminDao = new UserDAO(Admin);
      const adminFound = await adminDao.find({
        email: admin.email,
      });

      if (adminFound && adminFound.length > 0) {
        throw new HttpError(
          "User already exists",
          "USER_ALREADY_EXISTS",
          HTTP_STATUS.CONFLICT
        );
      }

      const adminPayload: IAdmin = new Admin({
        ...admin,
        createdAt: new Date(),
      });

      const adminCreated: IAdmin = await adminDao.create(adminPayload);

      if (!adminCreated) {
        throw new HttpError(
          "User not created",
          "USER_NOT_CREATED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      const userCleaned: Partial<AdminResponse> =
        AdminDTO.adminDTO(adminCreated);
      return userCleaned;
    } catch (err: any) {
      const error: HttpError = new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
      console.error("Error creating adopter:", err);
      throw error;
    }
  }
}
