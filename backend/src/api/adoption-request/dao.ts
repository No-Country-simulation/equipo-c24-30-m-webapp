import { Model, FilterQuery } from "mongoose";
import { IAdoptionRequest } from "./interface";

class AdoptionRequestDAO {
  private model: Model<IAdoptionRequest>;

  constructor(model: Model<IAdoptionRequest>) {
    this.model = model;
  }

  create(data: Partial<IAdoptionRequest>): Promise<IAdoptionRequest> {
    return this.model.create(data);
  }

  read(id: string): Promise<IAdoptionRequest | null> {
    return this.model.findById(id).lean().exec();
  }

  update(
    id: string,
    data: Partial<IAdoptionRequest>
  ): Promise<IAdoptionRequest | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<IAdoptionRequest | null> {
    return this.model.findByIdAndDelete(id).lean().exec();
  }

  find(query: FilterQuery<IAdoptionRequest>): Promise<IAdoptionRequest[]> {
    return this.model.find(query).lean().exec();
  }

  findWithShelterMatch(
    query: FilterQuery<IAdoptionRequest>,
    shelterMatch: any
  ): Promise<IAdoptionRequest[]> {
    return this.model
      .find({ ...query, shelter: shelterMatch })
      .lean()
      .exec();
  }

  findById(id: string): Promise<IAdoptionRequest | null> {
    return this.model
      .findById(id)
      .populate("adopter", "-password -__v")
      .populate("shelter", "-password -__v")
      .populate("pet", "-__v")
      .select("-__v")
      .lean();
  }
}

export default AdoptionRequestDAO;
