// INTERFACES
import { IShelter,  ShelterResponse} from "../shelter/interface";


export default class ShelterDto {
    static sheltersArrayDTO(shelters: IShelter[]): Partial<ShelterResponse>[] {
        return shelters.map((shelter) => ShelterDto.shelterDTO(shelter));
    }

    static shelterDTO(shelter: IShelter): Partial<ShelterResponse> {
        return {
            id: shelter._id.toString(),
            email: shelter.email,
            userName: shelter.userName,
            role: shelter.role,
            shelterName: shelter.shelterName,
            shelterEmail: shelter.shelterEmail,
            shelterPhone: shelter.shelterPhone,
            createdAt: shelter.createdAt,
            verified: shelter.verified,
            address: shelter.address,  
            status: shelter.status,
            phone: shelter.phone,
            updatedAt: shelter.updatedAt
        };
    }
}
