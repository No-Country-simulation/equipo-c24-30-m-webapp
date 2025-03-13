import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdopterService from "../adopter/service";
import { AdopterResponse, AdopterCreateFields } from "../adopter/interface";
import { ShelterCreateFields, ShelterResponse } from "../shelter/interface";
import { AdminCreateFields, AdminResponse } from "../admin/interface";
import { UserLoginFields } from "../user/interface";
import UserService from "../user/service";
import ShelterService from "../shelter/service";
import apiResponse from "../../utils/apiResponse.utils";
import AdminService from "../admin/service";

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
    try {
      let userResponse: Partial<
        AdopterResponse | ShelterResponse | AdminResponse
      > = {};

      if (req.body.role === "Adopter") {
        const adopterData: AdopterCreateFields = req.body;
        console.log(adopterData);
        userResponse = await AdopterService.createAdopter(adopterData);
      } else if (req.body.role === "Shelter") {
        const shelterData: ShelterCreateFields = req.body;
        console.log(shelterData);
        userResponse = await ShelterService.createShelter(shelterData);
      } else if (req.body.role === "Admin") {
        const userData: AdminCreateFields = req.body;
        userResponse = await AdminService.createAdmin(userData);
      }

      const response = apiResponse(true, userResponse);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (err: any) {
      // FIXME: Replace with a next function and a logger?
      const response = apiResponse(
        false,
        new HttpError(
          err.description || err.message,
          err.details || err.message,
          err.status || HTTP_STATUS.SERVER_ERROR
        )
      );
      res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
    }
  }

  static async oauthLogin(req: Request, res: Response): Promise<void> {
    try {
      const { provider, accessToken } = req.body;

      if (!["google", "facebook"].includes(provider)) {
        throw new Error("Invalid provider");
      }

      const { token } = await UserService.oauthLogin(
        provider as "google" | "facebook",
        accessToken
      );

      res.status(HTTP_STATUS.OK).json(apiResponse(true, { token }));
    } catch (err: any) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(apiResponse(false, err.message));
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      console.log("Login request");
      const userData: UserLoginFields = req.body;
      console.log(userData);

      let { token, userWithoutPassword } = await UserService.loginUser(
        userData
      );
      console.log(token);
      if (!token) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const response = apiResponse(true, { token, user: userWithoutPassword });
      res.status(HTTP_STATUS.OK).json(response);
    } catch (err: any) {
      const response = apiResponse(
        false,
        new HttpError(
          err.description || err.message,
          err.details || err.message,
          err.status || HTTP_STATUS.SERVER_ERROR
        )
      );
      res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
    }
  }
}
