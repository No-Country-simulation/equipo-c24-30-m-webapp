import { Model, FilterQuery } from "mongoose";
import { IForm } from "./interface";

class FormDAO {
  private model: Model<IForm>;

  constructor(model: Model<IForm>) {
    this.model = model;
  }

  async create(data: IForm): Promise<IForm> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<IForm | null> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<IForm[]> {
    return await this.model.find();
  }

  async update(id: string, data: Partial<IForm>): Promise<IForm | null> {
    const result = await this.model.findByIdAndUpdate(id, data, { new: true });
    return result;
  }

  async delete(id: string): Promise<IForm | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findByShelterId(shelterId: string): Promise<IForm | null> {
    return await this.model.findOne({ shelterId });
  }
}

export default FormDAO;
