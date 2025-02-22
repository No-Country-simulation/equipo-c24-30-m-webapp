import { Request, Response } from "express";

import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdopterService from "../adopter/service";
import {
  AdopterResponse,
  AdopterCreateFields,
  AdopterLoginFields,
  AdopterUpdateFields,
} from "../adopter/interface";
import { UserLoginFields } from "../user/interface";
import UserService from "../user/service";
import apiResponse from "../../utils/apiResponse.utils";

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
    try {
      let userResponse: Partial<AdopterResponse>;

      // if (req.body.role === "adopter") {
      const adopterData: AdopterCreateFields = req.body;
      userResponse = await AdopterService.createAdopter(adopterData);

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

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserLoginFields = req.body;

      const token = await UserService.loginUser(userData);

      if (!token) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const response = apiResponse(true, token);
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
