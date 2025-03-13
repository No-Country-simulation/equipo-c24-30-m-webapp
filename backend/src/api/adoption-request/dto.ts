// INTERFACES
import { IAdoptionRequest, AdoptionRequestResponse } from "./interface";

export default class AdoptionRequestDto {
  static adoptionRequestArrayDTO(
    adoptionRequests: IAdoptionRequest[]
  ): Partial<AdoptionRequestResponse>[] {
    return adoptionRequests.map((adoptionRequest) =>
      AdoptionRequestDto.adoptionRequestDTO(adoptionRequest)
    );
  }

  static adoptionRequestDTO(
    adoptionRequest: IAdoptionRequest
  ): Partial<AdoptionRequestResponse> {
    return {
      _id: adoptionRequest._id,
      adopter: adoptionRequest.adopter,
      pet: adoptionRequest.pet,
      shelter: adoptionRequest.shelter,
      status: adoptionRequest.status,
      reason: adoptionRequest.reason,
      formAnswers: adoptionRequest.formAnswers,
    };
  }
}
