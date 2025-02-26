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
            role: shelter.role,
            shelterName: shelter.shelterName,
        };
    }
}
