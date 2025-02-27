import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdopterService from "./service";

export default class AdopterController {
    // static async getAdopter(req: Request, res: Response) {
    //     try {
    //         const { user } = res.locals;
    //         const adopterId = req.params.id;
    //         const adopter = await AdopterService.getAdopterById(
    //             adopterId,
    //             user
    //         );

    //         const response = apiResponse(true, adopter);
    //         res.status(HTTP_STATUS.OK).json(response);
    //     } catch (err: any) {
    //         const response = apiResponse(
    //             false,
    //             new HttpError(
    //                 err.description || err.message,
    //                 err.details || err.message,
    //                 err.status || HTTP_STATUS.SERVER_ERROR
    //             )
    //         );
    //         res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
    //     }
    // }

    // static async update(req: Request, res: Response) {
    //     try {
    //         const { user } = res.locals;
    //         const { ...updateFields }: Partial<AdopterUpdateFields> = req.body;

    //         const files = req.files as MulterFiles;

    //         if (files && files.avatar) {
    //             updateFields.avatar = `/uploads/avatars/${files.avatar[0].filename}`;
    //         }

    //         const updatedUser = await AdopterService.updateAdopter(
    //             user,
    //             updateFields
    //         );

    //         const response = apiResponse(true, updatedUser);
    //         res.status(HTTP_STATUS.OK).json(response);
    //     } catch (err: any) {
    //         const response = apiResponse(
    //             false,
    //             new HttpError(
    //                 err.description || err.message,
    //                 err.details || err.message,
    //                 err.status || HTTP_STATUS.SERVER_ERROR
    //             )
    //         );
    //         res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
    //     }
    // }

}
