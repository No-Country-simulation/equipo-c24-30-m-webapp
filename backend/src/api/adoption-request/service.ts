// MODELS
import AdoptionRequest from "./model";
import { Types } from "mongoose";
import Pet from "../pet/model";
// DAOS
import AdoptionRequestDAO from "./dao";
import PetDAO from "../pet/dao";
// DTOS
import AdoptionRequestDto from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
// INTERFACES
import {
  AdoptionRequestCreateFields,
  AdoptionRequestResponse,
  AdoptionRequestUpdateFields,
  IAdoptionRequest,
} from "./interface";

export default class AdoptionRequestService {
  static async createAdoptionRequest(
    adopterId: Types.ObjectId,
    adoptionRequestFields: Omit<
      AdoptionRequestCreateFields,
      "adopter" | "shelter"
    >
  ): Promise<Partial<AdoptionRequestResponse>> {
    try {
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);
      const petDao = new PetDAO(Pet);

      if (!adoptionRequestFields.pet) {
        throw new HttpError(
          "Pet ID is missing",
          "PET_ID_MISSING",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const petId = adoptionRequestFields.pet;
      if (!Types.ObjectId.isValid(petId)) {
        throw new HttpError(
          "Invalid Pet ID format",
          "INVALID_PET_ID",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const pet = await petDao.read(adoptionRequestFields.pet.toString());
      console.log("pet found: ", pet);
      if (!pet) {
        throw new HttpError(
          "Pet not found",
          "PET_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const shelterId = pet.shelter;
      if (!shelterId) {
        throw new HttpError(
          "Shelter not found for this pet",
          "SHELTER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const existingRequest = await adoptionRequestDao.find({
        adopter: adopterId,
        pet: adoptionRequestFields.pet,
      });

      if (existingRequest.length > 0) {
        throw new HttpError(
          "Adoption request already exists",
          "ADOPTION_REQUEST_EXISTS",
          HTTP_STATUS.CONFLICT
        );
      }

      const formAnswers = adoptionRequestFields.formAnswers || [];

      const adoptionRequestPayload: IAdoptionRequest = new AdoptionRequest({
        ...adoptionRequestFields,
        adopter: adopterId,
        shelter: shelterId,
        formAnswers: formAnswers.map((answer) => ({
          question: answer.question,
          answer: answer.answer,
        })),
      });

      const createdRequest = await adoptionRequestDao.create(
        adoptionRequestPayload as any
      );

      if (!createdRequest) {
        throw new HttpError(
          "Adoption request not created",
          "ADOPTION_REQUEST_NOT_CREATED",
          HTTP_STATUS.SERVER_ERROR
        );
      }
      const populatedRequest = await AdoptionRequest.findById(
        createdRequest._id
      )
        .populate("adopter", "-password -__v")
        .populate("pet", "-__v")
        .select("-__v")
        .lean();

      if (!populatedRequest) {
        throw new HttpError(
          "Failed to retrieve adoption request",
          "REQUEST_RETRIEVAL_FAILED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      return AdoptionRequestDto.adoptionRequestDTO(populatedRequest);
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }

  static async updateAdoptionRequest(
    id: string,
    updateFields: Partial<AdoptionRequestUpdateFields>
  ): Promise<Partial<AdoptionRequestResponse>> {
    try {
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);

      const updatedRequest = await adoptionRequestDao.update(id, updateFields);

      if (!updatedRequest) {
        throw new HttpError(
          "Adoption request not updated",
          "ADOPTION_REQUEST_NOT_UPDATED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      return AdoptionRequestDto.adoptionRequestDTO(updatedRequest);
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }

  static async deleteAdoptionRequest(id: string): Promise<void> {
    try {
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);
      const deletedRequest = await adoptionRequestDao.delete(id);

      if (!deletedRequest) {
        throw new HttpError(
          "Adoption request not found",
          "ADOPTION_REQUEST_NOT_FOUND",
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

  static async getAdoptionRequest(
    id: string
  ): Promise<Partial<AdoptionRequestResponse>> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError(
          "Invalid ID format",
          "INVALID_ID",
          HTTP_STATUS.BAD_REQUEST
        );
      }
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);
      const adoptionRequest = await adoptionRequestDao.read(id);

      if (!adoptionRequest) {
        throw new HttpError(
          "Adoption request not found",
          "ADOPTION_REQUEST_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      return AdoptionRequestDto.adoptionRequestDTO(adoptionRequest);
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }

  static async getAllAdoptionRequests(): Promise<
    Partial<AdoptionRequestResponse>[]
  > {
    try {
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);
      const adoptionRequests = await adoptionRequestDao.find({});

      if (!adoptionRequests || adoptionRequests.length === 0) {
        throw new HttpError(
          "No adoption requests found",
          "NO_ADOPTION_REQUESTS_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      return AdoptionRequestDto.adoptionRequestArrayDTO(adoptionRequests);
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }
  static async getAdoptionRequestsByFilter(filter: {
    shelter?: string;
    pet?: string;
    adopter?: string;
  }): Promise<Partial<AdoptionRequestResponse>[]> {
    try {
      const adoptionRequestDao = new AdoptionRequestDAO(AdoptionRequest);
  
      
      if (!filter.shelter && !filter.pet && !filter.adopter) {
        throw new HttpError(
          "At least one filter parameter must be provided",
          "MISSING_FILTER_PARAMETER",
          HTTP_STATUS.BAD_REQUEST
        );
      }
  
      
      const query: any = {};
      if (filter.shelter) query.shelter = filter.shelter;
      if (filter.pet) query.pet = filter.pet;
      if (filter.adopter) query.adopter = filter.adopter;
  
      console.log("Query: ", query);
      
      const adoptionRequests = await adoptionRequestDao.find(query);
  
      if (!adoptionRequests || adoptionRequests.length === 0) {
        throw new HttpError(
          "No adoption requests found",
          "NO_ADOPTION_REQUESTS_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }
  
      return AdoptionRequestDto.adoptionRequestArrayDTO(adoptionRequests);
    } catch (err: any) {
      throw new HttpError(
        err.description || err.message,
        err.details || err.message,
        err.status || HTTP_STATUS.SERVER_ERROR
      );
    }
  }
}
