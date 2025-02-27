import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PetDAO from "./dao";
import { IPet, PetCreateFields, PetUpdateFields } from "./interface";
import Pet from "./model";

export default class PetService {
    private static petDao = new PetDAO(Pet);

    static async createPet(petData: PetCreateFields): Promise<IPet> {
        try {
            return await this.petDao.create(petData);
        } catch (err: any) {
            throw new HttpError(
                "Error creating pet",
                err.message,
                HTTP_STATUS.SERVER_ERROR
            );
        }
    }

    static async getPetById(id: string): Promise<IPet | null> {
        const pet = await this.petDao.read(id);
        if (!pet) throw new HttpError(
            "Pet not found", 
            "PET_NOT_FOUND", 
            HTTP_STATUS.NOT_FOUND
        );
        return pet;
    }

    static async updatePet(id: string, updateData: PetUpdateFields): Promise<IPet | null> {
        const updatedPet = await this.petDao.update(id, updateData);
        if (!updatedPet) throw new HttpError(
            "Pet not found",
            "PET_NOT_FOUND", 
            HTTP_STATUS.NOT_FOUND
        );
        return updatedPet;
    }

    static async deletePet(id: string): Promise<void> {
        const result = await this.petDao.delete(id);
        if (!result) throw new HttpError(
            "Pet not found",
            "PET_NOT_FOUND", 
            HTTP_STATUS.NOT_FOUND
        );
    }

    static async getAllPets(): Promise<IPet[]> {
        return await this.petDao.find({});
    }
}