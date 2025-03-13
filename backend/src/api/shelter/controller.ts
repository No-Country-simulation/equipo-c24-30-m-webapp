import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import ShelterService from "./service";
import PetService from "../pet/service";
import { PetUpdateFields } from "../pet/interface";

export default class ShelterController {
  static async getShelter(req: Request, res: Response) {
    try {
      const shelterId = req.params.id;
      const shelter = await ShelterService.getShelterById(shelterId);

      const response = apiResponse(true, shelter);
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

  static async updateShelter(req: Request, res: Response) {
    try {
      const { user } = res.locals;
      const { ...updateFields } = req.body;

      console.log(updateFields);
      console.log(user);

      const updatedShelter = await ShelterService.updateShelter(
        user,
        updateFields
      );

      console.log("updatedShelter", updatedShelter);

      const response = apiResponse(true, updatedShelter);
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

  static async CreateAdoptionPost(req: Request, res: Response) {
    try {
      const shelterId = res.locals.user.id;
      console.log(shelterId);
      const petData = {
        ...req.body,
        shelter: shelterId,
      };
      const pet = await PetService.createPet(petData);

      const response = apiResponse(true, pet);
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

  static async UpdateAdoptionPost(req: Request, res: Response) {
    try {
      const petID = req.params.id;
      const petData: PetUpdateFields | null = await PetService.getPetById(
        petID
      );

      if (!petData) {
        throw new HttpError(
          "Pet not found",
          "PET_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }
      console.log(petData);
      const pet = await PetService.updatePet(petID, petData);

      const response = apiResponse(true, pet);
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

  static async DeleteAdoptionPost(req: Request, res: Response) {
    try {
      const petId = req.params.id;
      await PetService.setAvailability(petId, false);

      const response = apiResponse(true, {
        message: "Adoption Post deleted successfully",
      });
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
