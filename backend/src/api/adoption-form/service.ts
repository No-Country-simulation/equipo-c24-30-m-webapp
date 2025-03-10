// MODELS
import Form from "./model";
import Shelter from "../shelter/model";
import { Types } from "mongoose";
// DAOS
import FormDAO from "./dao";
// DTOS

// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
import { IField, IForm } from "./interface";
import ShelterDAO from "../shelter/dao";
// INTERFACES

export default class FormService {
  static async create(
    shelterId: string,
    name: string,
    fields: IField[]
  ): Promise<Partial<IForm>> {
    try {
      const formDao = new FormDAO(Form);

      const formPayload: IForm = new Form({
        name,
        fields,
        shelterId,
      });

      const createdForm = await formDao.create(formPayload);

      if (!createdForm) {
        throw new HttpError(
          "Form request not created",
          "Form_REQUEST_NOT_CREATED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      return createdForm;
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }

  static async getAdoptionFormByShelterId(id: string): Promise<Partial<IForm>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError(
          "Invalid ID format",
          "INVALID_ID",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const shelterDao = new ShelterDAO();

      const shelterFound = await shelterDao.find({
        id: id,
      });

      if (!shelterFound) {
        throw new HttpError(
          "shelter not found",
          "SHELTER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const adoptionFormDao = new FormDAO(Form);
      const form = await adoptionFormDao.findByShelterId(id);

      if (!form) {
        throw new HttpError(
          "Adoption request not found",
          "ADOPTION_REQUEST_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      return form;
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }
}
