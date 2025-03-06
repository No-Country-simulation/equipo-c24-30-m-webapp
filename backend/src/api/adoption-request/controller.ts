import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse.utils";
import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import AdoptionRequestService from "./service";
import { Roles } from "../../constants/Roles";

export default class AdoptionRequestController { 
    static async createAdoptionRequest(req: Request, res: Response) { 
        try { 
            const { user } = res.locals; 
            const { ...adoptionRequestFields } = req.body; 
            console.log("adopter", user);
            console.log("adoptionRequestFields", adoptionRequestFields);
            const adoptionRequest = await AdoptionRequestService.createAdoptionRequest(
                user.id, 
                adoptionRequestFields 
            ); 
            console.log("adoptionRequest", adoptionRequest);
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

            if(!adoptionRequest) {
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
            const adoptionRequests = await AdoptionRequestService.getAllAdoptionRequests();
            res.status(HTTP_STATUS.OK).json(apiResponse(true, adoptionRequests));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async deleteAdoptionRequest(req: Request, res: Response) {
        try {
            const adoptionRequestId = req.params.id;
            await AdoptionRequestService.deleteAdoptionRequest(adoptionRequestId);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, {"Message":  "Adoption request deleted"}));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async updateAdoptionRequest(req: Request, res: Response) {
        try {
            const adoptionRequestId = req.params.id;
            const { ...updateFields } = req.body;
            const updatedAdoptionRequest = await AdoptionRequestService.updateAdoptionRequest(
                adoptionRequestId,
                updateFields
            );
            res.status(HTTP_STATUS.OK).json(apiResponse(true, updatedAdoptionRequest));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }
}
