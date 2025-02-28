import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import ShelterService from "./service";
import PetService from "../pet/service";

export default class ShelterController {
    static async getShelter(req: Request, res: Response) {
        try {
            const shelterId = req.params.id;
            const shelter = await ShelterService.getShelterById(
                shelterId
            );

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

    static async CreateAdoptionPost(req: Request, res: Response) {
        try {
            const shelterId =  res.locals.user.id;
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
            const petData = req.body;
            const pet = await PetService.updatePet(petData.id, petData);

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
            const petId = req.body.id;
            await PetService.setAvailability(petId, false);

            const response = apiResponse(true, { message: "Pet deleted successfully" });
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
