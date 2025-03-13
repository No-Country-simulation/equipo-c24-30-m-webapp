import HTTP_STATUS from "../../constants/HttpStatus";
import HttpError from "../../utils/HttpError.utils";
import PetDAO from "./dao";
import {
  IPet,
  PetCreateFields,
  PetFilters,
  PetResponse,
  PetUpdateFields,
} from "./interface";
import Pet from "./model";
import { Age } from "../../constants/Age";
import ShelterService from "../shelter/service";

export default class PetService {
  private static petDao = new PetDAO(Pet);

  static async createPet(petData: PetCreateFields): Promise<PetResponse> {
    try {
      const shelter = await ShelterService.getShelterById(
        petData.shelter.toString()
      );

      if (!shelter) {
        throw new HttpError(
          "shelter not found",
          "SHELTER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const createdPet = await this.petDao.create(petData);
      const populatedPet = await this.petDao.read(createdPet._id.toString());

      if (!populatedPet) {
        throw new HttpError(
          "Error creating pet",
          "PET_CREATE_FAILED",
          HTTP_STATUS.SERVER_ERROR
        );
      }

      return this.transformPetResponse(populatedPet);
    } catch (err: any) {
      throw new HttpError(
        "Error creating pet",
        err.message,
        HTTP_STATUS.SERVER_ERROR
      );
    }
  }

  static async getPetById(id: string): Promise<PetResponse | null> {
    const pet = await this.petDao.read(id);
    if (!pet)
      throw new HttpError(
        "Pet not found",
        "PET_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND
      );
    return this.transformPetResponse(pet);
  }

  static async updatePet(
    id: string,
    updateData: PetUpdateFields
  ): Promise<PetResponse | null> {
    const updatedPet = await this.petDao.update(id, updateData);
    if (!updatedPet)
      throw new HttpError(
        "Pet not found",
        "PET_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND
      );
    return this.transformPetResponse(updatedPet);
  }

  static async deletePet(id: string): Promise<{ response: string }> {
    const result = await this.petDao.delete(id);
    if (!result)
      throw new HttpError(
        "Pet not found",
        "PET_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND
      );
    return { response: "deleted" };
  }

  static async getAllPets(filters: PetFilters = {}): Promise<PetResponse[]> {
    const pets = await this.petDao.findWithShelterMatch(
      this.buildQuery(filters),
      this.buildShelterMatch(filters)
    );

    return pets
      .filter((pet) => pet.shelter)
      .map((pet) => this.transformPetResponse(pet));
  }

  private static buildQuery(filters: PetFilters): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.species) query.type = filters.species;
    if (filters.sex) query.sex = filters.sex;
    if (filters.healthStatus) query.healthStatus = filters.healthStatus;

    if (filters.age) {
      const { min, max } = filters.age;

      if (min || max) {
        query.$and = [];

        const createAgeCondition = (
          ageValue: Age,
          isMinCondition: boolean
        ): Record<string, any> => {
          const operator = isMinCondition
            ? { years: "$gt", months: "$gt", days: "$gte" }
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
                    "age.days": { [operator.days]: ageValue.days },
                  },
                ],
              },
            ],
          };
        };

        if (min) query.$and.push(createAgeCondition(min, true));
        if (max) query.$and.push(createAgeCondition(max, false));
      }
    }

    return query;
  }

  private static buildShelterMatch(filters: PetFilters): Record<string, any> {
    const shelterMatch: Record<string, any> = {};

    if (filters.address) {
      const { city, province, country } = filters.address;
      if (city) shelterMatch["address.city"] = city;
      if (province) shelterMatch["address.province"] = province;
      if (country) shelterMatch["address.country"] = country;
    }

    return shelterMatch;
  }

  private static transformPetResponse(pet: IPet): PetResponse {
    return {
      id: pet._id.toString(),
      name: pet.name,
      photos: pet.photos,
      sex: pet.sex,
      age: pet.age,
      type: pet.type,
      size: pet.size,
      breed: pet.breed,
      neutered: pet.neutered,
      vaccinated: pet.vaccinated,
      specialCare: pet.specialCare,
      description: pet.description,
      shelter: pet.shelter,
      adopter: pet.adopter,
      status: pet.status,
      createdAt: pet.createdAt,
      available: pet.available,
      updatedAt: pet.updatedAt,
    };
  }

  static async setAvailability(
    id: string,
    available: boolean
  ): Promise<IPet | null> {
    const updatedPet = await this.petDao.update(id, { available });
    if (!updatedPet)
      throw new HttpError(
        "Pet not found",
        "PET_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND
      );
    return updatedPet;
  }

  static async getPetsByShelterId(shelterId: string): Promise<PetResponse[]> {
    const pets = await this.petDao.find({ shelter: shelterId });
    return pets.map((pet) => this.transformPetResponse(pet));
  }
}
