// LIBRARIES
import { Model, FilterQuery } from "mongoose";

class UserDAO<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async read(id: string): Promise<T | null> {
    return (await this.model.findById(id).lean()) as T | null;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async find(query: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(query).exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().select("-password").exec();
  }
}

export default UserDAO;
