import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdopterService from "./service";
import { Roles } from "../../constants/Roles";

export default class AdopterController {
    static async getAdopter(req: Request, res: Response) {
        try {
            const adopterId = req.params.id;
            const adopter = await AdopterService.getAdopterById(
                adopterId
            );

            const response = apiResponse(true, adopter);
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

    static async updateAdopter(req: Request, res: Response) {
        try {
            const { user } = res.locals;
            const { ...updateFields } = req.body;

            if (user.role !== Roles.ADMIN && user.id !== req.params.id) {
                throw new HttpError(
                    "Unauthorized action",
                    "UNAUTHORIZED",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }

            console.log(updateFields);
            console.log(user);

            const updatedAdopter = await AdopterService.updateAdopter(
                user,
                updateFields
            );

            console.log("updatedAdopter", updatedAdopter);

            const response = apiResponse(true, updatedAdopter);
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
