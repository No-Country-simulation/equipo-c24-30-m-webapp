// INTERFACES
import { IAdopter,  AdopterResponse} from "../adopter/interface";


export default class AdopterDto {
    static adoptersArrayDTO(adopters: IAdopter[]): Partial<AdopterResponse>[] {
        return adopters.map((adopter) => AdopterDto.adopterDTO(adopter));
    }

    static adopterDTO(adopter: IAdopter): Partial<AdopterResponse> {
        return {
            id: adopter._id.toString(),
            email: adopter.email,
            role: adopter.role,
            favoriteAnimals: adopter.favoriteAnimals,
            ...(adopter.dateOfBirth && { dateOfBirth: adopter.dateOfBirth }),
            ...(adopter.gender && { gender: adopter.gender }),
            ...(adopter.phone && { phone: adopter.phone }),
        };
    }
}
