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
        return await this.model.findById(id).populate("shelter adopter").lean();
    }

    async update(id: string, data: Partial<IPet>): Promise<IPet | null> {
        return await this.model
            .findByIdAndUpdate(id, data, { new: true })
            .populate([
                "shelter", "adopter"
            ])
            .lean();
    }

    async delete(id: string): Promise<IPet | null> {
        return await this.model.findByIdAndDelete(id).lean();
    }

    async find(query: FilterQuery<IPet>): Promise<IPet[]> {
        return await this.model.find(query).populate("shelter adopter").lean();
    }
}

export default PetDAO;