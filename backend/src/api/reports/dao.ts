import { Model } from "mongoose";
import { IReport, ReportCreateFields, ReportUpdateFields } from "./interface";

class ReportDAO{
    private model: Model<IReport>;

    constructor(model: Model<IReport>){
        this.model = model;
    }

    async create(data: ReportCreateFields): Promise<IReport>{
        return await this.model.create(data);
    }

    async findById(id: string): Promise<IReport | null> {
        return await this.model.findById(id).populate('userId').lean().exec();
    }

    async findAll(): Promise<IReport[]> {
        return await this.model.find().populate('userId').lean().exec();
    }

    async update(id: string, data: ReportUpdateFields): Promise<IReport | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).populate('userId').lean().exec();
    }

    async delete(id: string): Promise<IReport | null> {
        return await this.model.findByIdAndDelete(id).lean().exec();
    }
}

export default ReportDAO;