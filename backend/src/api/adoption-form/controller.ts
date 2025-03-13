import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import FormService from "./service";

export default class FormController {
  static async createForm(req: Request, res: Response) {
    try {
      const { name, fields } = req.body;
      const { user } = res.locals;

      const newForm = await FormService.create(user.id, name, fields);
      const response = apiResponse(true, newForm);
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
  static async getFormByShelterId(req: Request, res: Response) {
    try {
      const form = await FormService.getAdoptionFormByShelterId(req.params.id);
      if (!form) {
        throw new HttpError(
          "form request not found",
          "FORM_REQUEST_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }
      const response = apiResponse(true, form);
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
  static async updateForm(req: Request, res: Response) {
    try {
      const { ...updateFields } = req.body;
      const { user } = res.locals;

      console.log("userid", user.id);
      console.log(updateFields);
      const newForm = await FormService.updateAdoptionForm(
        user.id,
        updateFields
      );
      const response = apiResponse(true, newForm);
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
  static async deleteForm(req: Request, res: Response) {
    try {
      const { name, fields } = req.body;
      const { user } = res.locals;

      const newForm = await FormService.deleteAdoptionForm(user.id);
      const response = apiResponse(true, { message: "deleted form" });
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
