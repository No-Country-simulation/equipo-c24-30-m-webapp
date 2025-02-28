import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PetDAO from "./dao";
import { IPet, PetCreateFields, PetFilters, PetUpdateFields } from "./interface";
import Pet from "./model";
import { Age } from "../../constants/Age";

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

    // maybe someone should rewrite this or modularize it by a class querybuilder, dunno, but i don't like it.
    static async getAllPets(filters: PetFilters = {}): Promise<IPet[]> {
        const query: Record<string, any> = {};
        const shelterMatch: Record<string, any> = {};
    
        if (filters.species) query.type = filters.species;
        if (filters.gender) query.gender = filters.gender;
        if (filters.healthStatus) query.healthStatus = filters.healthStatus;
    
        if (filters.address) {
            const { city, province, country } = filters.address;
            if (city) shelterMatch["address.city"] = city;
            if (province) shelterMatch["address.province"] = province;
            if (country) shelterMatch["address.country"] = country;
        }
    
        if (filters.age) {
            const { min, max } = filters.age;
            
            if (min || max) {
                query.$and = [];
                
                const createAgeCondition = (ageValue: Age, isMinCondition: boolean): Record<string, any> => {
                    const operator = isMinCondition ? { years: "$gt", months: "$gt", days: "$gte" } 
                                                   : { years: "$lt", months: "$lt", days: "$lte" };
                    
                    return {
                        $or: [
                            { "age.years": { [operator.years]: ageValue.years } },
                            {
                                "age.years": ageValue.years,
                                $or: [
                                    { "age.months": { [operator.months]: ageValue.months } },
                                    {
                                        "age.months": ageValue.months,
                                        "age.days": { [operator.days]: ageValue.days }
                                    }
                                ]
                            }
                        ]
                    };
                };
                
                if (min) query.$and.push(createAgeCondition(min, true));
                if (max) query.$and.push(createAgeCondition(max, false));
            }
        }
    
        const pets = await this.petDao.findWithShelterMatch(query, shelterMatch);
        
        return pets.filter(pet => pet.shelter);
    }
    
    static async setAvailability(id: string, available: boolean): Promise<IPet | null> {
        const updatedPet = await this.petDao.update(id, { available });
        if (!updatedPet) throw new HttpError(
            "Pet not found",
            "PET_NOT_FOUND", 
            HTTP_STATUS.NOT_FOUND
        );
        return updatedPet;
    }
}