// MODELS
import { FilterQuery } from "mongoose";
import Shelter from "./model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IShelter } from "../shelter/interface";

class ShelterDAO extends UserDAO<IShelter> {
  constructor() {
    super(Shelter);
  }

  async read(id: string): Promise<IShelter | null> {
    return await Shelter.findById(id)
      .populate([{ path: "Pet", options: { strictPopulate: false } }])
      .lean();
  }

  async update(id: string, data: Partial<IShelter>): Promise<IShelter | null> {
    const shelter = await Shelter.findById(id);
    if (!shelter) return null;

    return await Shelter.findByIdAndUpdate(id, data, { new: true })
      .populate([{ path: "Pet", options: { strictPopulate: false } }])
      .lean();
  }

  async delete(id: string): Promise<IShelter | null> {
    return await Shelter.findByIdAndDelete(id).lean();
  }

  async find(query: FilterQuery<IShelter>): Promise<IShelter[]> {
    return await Shelter.find(query)
      .populate([{ path: "Pet", options: { strictPopulate: false } }])
      .lean();
  }
}

export default ShelterDAO;
