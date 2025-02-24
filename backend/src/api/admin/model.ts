// LIBRARIES
import { Schema } from "mongoose";
// MODELS
import User from "../user/model";
// INTERFACES
import { IAdmin } from "../admin/interface";

const Admin = User.discriminator(
    "Admin",
    new Schema<IAdmin>({
        permissions: [
            {
                type: String,
                enum: ["MANAGE_USERS", "MANAGE_SHELTERS", "MANAGE_ADOPTIONS", "MANAGE_DONATIONS"],
            },
        ],
    })
);

export default Admin;
