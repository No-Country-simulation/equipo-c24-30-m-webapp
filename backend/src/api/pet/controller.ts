import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import PetService from "./service";
import apiResponse from "../../utils/apiResponse.utils";

export default class PetController {
    static async createPet(req: Request, res: Response) {
        try {
            const newPet = await PetService.createPet(req.body);
            res.status(HTTP_STATUS.CREATED).json(apiResponse(true, newPet));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getPet(req: Request, res: Response) {
        try {
            const pet = await PetService.getPetById(req.params.id);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, pet));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async updatePet(req: Request, res: Response) {
        try {
            const updatedPet = await PetService.updatePet(req.params.id, req.body);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, updatedPet));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async deletePet(req: Request, res: Response) {
        try {
            const result = await PetService.deletePet(req.params.id);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, result));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getAllPets(req: Request, res: Response) {
        try {
            const filters = req.query;
            const pets = await PetService.getAllPets(filters);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, pets));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }
}