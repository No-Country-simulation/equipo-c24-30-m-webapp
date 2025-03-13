// MODELS
import Form from "./model";
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

  static async updateAdoptionForm(
      shelterId: string,
      updateFields: Partial<IForm>
    ): Promise<Partial<IForm>> {
      try {
        const adoptionFormDao = new FormDAO(Form);

        const formShelter = await adoptionFormDao.findByShelterId(shelterId);

        if (!formShelter) {
          throw new HttpError(
            "Adoption form not found",
            "ADOPTION_FORM_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
          );
        }

        if (!formShelter.id) {
          throw new HttpError(
            "Form shelter ID is undefined",
            "FORM_SHELTER_ID_UNDEFINED",
            HTTP_STATUS.SERVER_ERROR
          );
        }
        const updatedForm = await adoptionFormDao.update(formShelter.id.toString(), updateFields);
  
        if (!updatedForm) {
          throw new HttpError(
            "Form adoption not updated",
            "FORM_REQUEST_NOT_UPDATED",
            HTTP_STATUS.SERVER_ERROR
          );
        }
  
        return updatedForm;
      } catch (err: any) {
        throw new HttpError(
          err.description || err.message,
          err.details || err.message,
          err.status || HTTP_STATUS.SERVER_ERROR
        );
      }
    }

  
    static async deleteAdoptionForm(shelterId: string): Promise<void> {
      try {
        const adoptionFormDao = new FormDAO(Form);

        const formShelter = await adoptionFormDao.findByShelterId(shelterId);

        if (!formShelter) {
          throw new HttpError(
            "Adoption form not found",
            "ADOPTION_FORM_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
          );
        }

        if (!formShelter.id) {
          throw new HttpError(
            "Form shelter ID is undefined",
            "FORM_SHELTER_ID_UNDEFINED",
            HTTP_STATUS.SERVER_ERROR
          );
        }
        
        const deletedForm = await adoptionFormDao.delete(formShelter.id.toString());
  
        if (!deletedForm) {
          throw new HttpError(
            "Form request not found",
            "FORM_REQUEST_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
          );
        }
      } catch (err: any) {
        throw new HttpError(
          err.description || err.message,
          err.details || err.message,
          err.status || HTTP_STATUS.SERVER_ERROR
        );
      }
    }
}
