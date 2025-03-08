import { Model, FilterQuery } from "mongoose";
import { IPet } from "./interface";

class PetDAO {
  private model: Model<IPet>;

  constructor(model: Model<IPet>) {
    this.model = model;
  }

  async create(data: Partial<IPet>): Promise<IPet> {
    return await this.model.create(data);
  }

  async read(id: string): Promise<IPet | null> {
    return await this.model
      .findById(id)
      .populate({
        path: "shelter",
        select: "-password -__v",
      })
      .populate({
        path: "adopter",
        select: "-password -__v",
      })
      .lean();
  }

  async update(id: string, data: Partial<IPet>): Promise<IPet | null> {
    console.log(data);
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPet | null> {
    return await this.model.findByIdAndDelete(id).lean();
  }

  async find(query: FilterQuery<IPet>): Promise<IPet[]> {
    return await this.model
      .find(query)
      .populate("shelter adopter")
      .populate({
        path: "shelter",
        select: "-password -__v",
      })
      .populate({
        path: "adopter",
        select: "-password -__v",
      })
      .lean();
  }

  // i could not find a way to do the address filter without this method. If you find a way feel free to rewrite it.
  async findWithShelterMatch(
    query: FilterQuery<IPet>,
    shelterMatch: any
  ): Promise<IPet[]> {
    return await this.model
      .find(query)
      .populate({
        path: "shelter",
        match: shelterMatch,
        select: "-password -__v",
      })
      .populate({
        path: "adopter",
        select: "-password -__v",
      })
      .lean();
  }
}

export default PetDAO;
