// MODELS
import Adopter from "./model";
// DAOS
import UserDAO from "../user/dao";
// DTOS
import AdopterDto from "./dto";
// UTILS
import HttpError from "../../utils/HttpError.utils";
// CONSTANTS
import HTTP_STATUS from "../../constants/HttpStatus";
// INTERFACES
import {
    IAdopter,
    AdopterCreateFields,
    AdopterResponse,
    AdopterUpdateFields,
} from "./interface";

//import { ITokenPayload } from "../auth/interface";

export default class AdopterService {

    static async createAdopter(
        adopter: AdopterCreateFields
    ): Promise<Partial<AdopterResponse>> {
        try {
            const adopterDao = new UserDAO(Adopter);
            const adopterFound = await adopterDao.find({
                email: adopter.email,
            });

            if (adopterFound && adopterFound.length > 0) {
                throw new HttpError(
                    "User already exists",
                    "USER_ALREADY_EXISTS",
                    HTTP_STATUS.CONFLICT
                );
            }

            const adopterPayload: IAdopter = new Adopter({
                ...adopter,
                createdAt: new Date(),
            });

            const adopterCreated: IAdopter = await adopterDao.create(
                adopterPayload
            );

            if (!adopterCreated) {
                throw new HttpError(
                    "User not created",
                    "USER_NOT_CREATED",
                    HTTP_STATUS.SERVER_ERROR
                );
            }

            const userCleaned: Partial<AdopterResponse> =
                AdopterDto.adopterDTO(adopterCreated);
            return userCleaned;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            console.error("Error creating adopter:", err);
            throw error;
        }
    }

    // static async updateAdopter(
    //     user: ITokenPayload,
    //     updateFields: Partial<AdopterUpdateFields>
    // ): Promise<Partial<AdopterResponse>> {
    //     try {
    //         const adopterDao = new AdopterDAO();
    //         const adopterFound = await adopterDao.read(user.id);
    //         if (!adopterFound) {
    //             throw new HttpError(
    //                 "User not found",
    //                 "USER_NOT_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }

    //         const adopterPayload: Partial<IAdopter> = {
    //             ...adopterFound,
    //             ...updateFields,
    //         };

    //         if (
    //             Object.keys(updateFields).some((field) =>
    //                 this.ClinicalFields.includes(field)
    //             )
    //         ) {
    //             const adopterClinicalDataCreated =
    //                 await AdopterClinicalDataService.createClinicalData(
    //                     updateFields,
    //                     new Types.ObjectId(user.id)
    //                 );

    //             adopterPayload.clinicalData =
    //                 adopterClinicalDataCreated._id as Types.ObjectId;
    //         }

    //         const updatedAdopter = await adopterDao.update(
    //             adopterFound._id.toString(),
    //             adopterPayload
    //         );

    //         if (!updatedAdopter) {
    //             throw new HttpError(
    //                 "User not updated",
    //                 "USER_NOT_UPDATED",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }

    //         const userCleaned: Partial<AdopterResponse> =
    //             AdopterDto.adopterDTO(updatedAdopter);

    //         return userCleaned;
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );

    //         throw error;
    //     }
    // }

    // static async getAllAdopters(): Promise<Partial<AdopterResponse>[]> {
    //     try {
    //         const adopterDao = new UserDAO(Adopter);
    //         const adopters = await adopterDao.find({ role: Roles.ADOPTER });

    //         if (!adopters || adopters.length === 0) {
    //             throw new HttpError(
    //                 "No adopters found",
    //                 "NO_PATIENTS_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }

    //         const adoptersResponse = AdopterDto.adoptersArrayDTO(adopters);

    //         return adoptersResponse;
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }

    // static async getAdopterById(
    //     id: string,
    //     user?: ITokenPayload
    // ): Promise<Partial<AdopterResponse>> {
    //     try {
    //         if (user && user.role === Roles.ADOPTER && user.id !== id) {
    //             throw new HttpError(
    //                 "You are not authorized to access this adopter",
    //                 "NOT_AUTHORIZED",
    //                 HTTP_STATUS.UNAUTHORIZED
    //             );
    //         }
    //         let adopter;

    //         if (user && user.role === Roles.SHELTER && user.id !== id) {
    //             const adopterRepository = new AdopterRepository(Adopter);
    //             const adopterByDoctor = await adopterRepository.getAdopter({
    //                 $and: [
    //                     { _id: new Types.ObjectId(id) },
    //                     { authorizedDoctors: new Types.ObjectId(user.id) },
    //                 ],
    //             });
    //             adopter = adopterByDoctor;
    //         } else {
    //             const adopterDao = new AdopterDAO();
    //             adopter = await adopterDao.read(id);
    //         }

    //         if (!adopter) {
    //             throw new HttpError(
    //                 "Adopter not found",
    //                 "PATIENT_NOT_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }
    //         const adopterCleaned: Partial<AdopterResponse> =
    //             AdopterDto.adopterDTO(adopter);
    //         return adopterCleaned;
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }

    // static async getAdopterByEmail(
    //     email: string
    // ): Promise<Partial<AdopterResponse>> {
    //     try {
    //         const adopterRepository = new AdopterRepository(Adopter);
    //         const adopter = await adopterRepository.getAdopter({
    //             email: email,
    //         });
    //         if (!adopter) {
    //             throw new HttpError(
    //                 "Adopter not found",
    //                 "PATIENT_NOT_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }
    //         const adopterCleaned: Partial<AdopterResponse> =
    //             AdopterDto.adopterDTO(adopter);
    //         return adopterCleaned;
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }

}
