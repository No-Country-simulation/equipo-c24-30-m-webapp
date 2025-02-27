// MODELS
import { Types } from "mongoose";
import Adopter from "./model";
// DAOS
import UserDAO from "../user/dao";
// INTERFACES
import { IAdopter } from "../adopter/interface";

class AdopterDAO extends UserDAO<IAdopter> {
    constructor() {
        super(Adopter);
    }

    async read(id: string): Promise<IAdopter | null> {
        return await Adopter.findById(id)
            .populate([{ path: "favoritePets", options: { strictPopulate: false } }])
            .lean();
    }

    async update(id: string, data: Partial<IAdopter>): Promise<IAdopter | null> {
        const adopter = await Adopter.findById(id);
        if (!adopter) return null; 
    
        return await Adopter.findByIdAndUpdate(id, data, { new: true })
            .populate([{ path: "favoritePets", options: { strictPopulate: false } }])
            .lean();
    }
    
}

export default AdopterDAO;
