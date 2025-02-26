// MODELS
import Shelter from "./model";
// DAOS
import UserDAO from "../user/dao";
import ShelterDAO from "./dao"; // 
// DTOS
import ShelterDto from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
import { Roles } from "../../constants/Roles"; 
// INTERFACES
import {
    IShelter,
    ShelterCreateFields,
    ShelterResponse,
    ShelterUpdateFields,
} from "./interface";


export default class ShelterService {

    static async createShelter(
        shelter: ShelterCreateFields
    ): Promise<Partial<ShelterResponse>> {
        try {
            const shelterDao = new UserDAO(Shelter);
            const shelterFound = await shelterDao.find({
                email: shelter.email,
            });
            console.log("este es ", shelterFound);
            if (shelterFound && shelterFound.length > 0) {
                throw new HttpError(
                    "User already exists",
                    "USER_ALREADY_EXISTS",
                    HTTP_STATUS.CONFLICT
                );
            }

            const shelterPayload: IShelter = new Shelter({
                ...shelter,
                createdAt: new Date(),
            });

            const shelterCreated: IShelter = await shelterDao.create(
                shelterPayload
            );

            if (!shelterCreated) {
                throw new HttpError(
                    "User not created",
                    "USER_NOT_CREATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const userCleaned: Partial<ShelterResponse> =
                ShelterDto.shelterDTO(shelterCreated);
            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            console.error("Error creating shelter:", err);
            throw error;
        }
    }


    static async getAllShelters(): Promise<Partial<ShelterResponse>[]> {
        try {
            const shelterDao = new UserDAO(Shelter);
            const shelters = await shelterDao.find({ role: Roles.SHELTER });

            if (!shelters || shelters.length === 0) {
                throw new HttpError(
                    "No shelters found",
                    "NO_SHELTERS_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            const sheltersResponse = ShelterDto.sheltersArrayDTO(shelters);

            return sheltersResponse;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }

    static async getShelterById(
        id: string,
    ): Promise<Partial<ShelterResponse>> {
        try {
            const shelterDao = new ShelterDAO();
            const shelter = await shelterDao.read(id);
            
            if (!shelter) {
                throw new HttpError(
                    "Shelter not found",
                    "SHELTER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }
            const shelterCleaned: Partial<ShelterResponse> =
                ShelterDto.shelterDTO(shelter);
            return shelterCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }

}
