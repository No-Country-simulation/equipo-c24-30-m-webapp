import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import ShelterService from "./service";

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

}
