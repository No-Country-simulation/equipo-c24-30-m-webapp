import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdoptionRequestService from "./service";
import PetService from "../pet/service";

export default class AdoptionRequestController {
  static async createAdoptionRequest(req: Request, res: Response) {
    try {
      const { user } = res.locals;
      const { ...adoptionRequestFields } = req.body;

      const shelterId = PetService.getPetById(adoptionRequestFields.pet);

      const adoptionRequest =
        await AdoptionRequestService.createAdoptionRequest(
          user.id,
          adoptionRequestFields
        );
      const response = apiResponse(true, adoptionRequest);
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

  static async getAdoptionRequest(req: Request, res: Response) {
    try {
      const adoptionRequestId = req.params.id;
      const adoptionRequest = await AdoptionRequestService.getAdoptionRequest(
        adoptionRequestId
      );

      if (!adoptionRequest) {
        throw new HttpError(
          "Adoption request not found",
          "ADOPTION_REQUEST_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const response = apiResponse(true, adoptionRequest);
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

  static async getAllAdoptionRequests(req: Request, res: Response) {
    try {
      const adoptionRequests =
        await AdoptionRequestService.getAllAdoptionRequests();
      res.status(HTTP_STATUS.OK).json(apiResponse(true, adoptionRequests));
    } catch (err: any) {
      res
        .status(err.status || HTTP_STATUS.SERVER_ERROR)
        .json(apiResponse(false, err));
    }
  }

  static async deleteAdoptionRequest(req: Request, res: Response) {
    try {
      const adoptionRequestId = req.params.id;
      await AdoptionRequestService.deleteAdoptionRequest(adoptionRequestId);
      res
        .status(HTTP_STATUS.OK)
        .json(apiResponse(true, { Message: "Adoption request deleted" }));
    } catch (err: any) {
      res
        .status(err.status || HTTP_STATUS.SERVER_ERROR)
        .json(apiResponse(false, err));
    }
  }

  static async updateAdoptionRequest(req: Request, res: Response) {
    try {
      const adoptionRequestId = req.params.id;
      const { ...updateFields } = req.body;
      const updatedAdoptionRequest =
        await AdoptionRequestService.updateAdoptionRequest(
          adoptionRequestId,
          updateFields
        );
      res
        .status(HTTP_STATUS.OK)
        .json(apiResponse(true, updatedAdoptionRequest));
    } catch (err: any) {
      res
        .status(err.status || HTTP_STATUS.SERVER_ERROR)
        .json(apiResponse(false, err));
    }
  }

  static async getAdoptionRequestsByFilter(req: Request, res: Response) {
    try {
      const { shelter, pet, adopter } = req.query;
      const filter: any = {};
      if (shelter) filter.shelter = shelter;
      if (pet) filter.pet = pet;
      if (adopter) filter.adopter = adopter;
      
      const adoptionRequests =
        await AdoptionRequestService.getAdoptionRequestsByFilter(filter);
      res.status(HTTP_STATUS.OK).json(apiResponse(true, adoptionRequests));
    } catch (err: any) {
      res
        .status(err.status || HTTP_STATUS.SERVER_ERROR)
        .json(
          apiResponse(
            false,
            new HttpError(err.message, err.details, err.status)
          )
        );
    }
  }
}
