// LIBRARIES
import { Schema, model } from "mongoose";
// CONSTANTS
import { Roles } from "../../constants/Roles";
// UTILS
import { BcryptUtils } from "../../utils/bcrypt.utils";
// INTERFACES
import { IUser } from "./interface";

const userSchema = new Schema<IUser>(
    {
        userName: { type: String, required: true, trim: true },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            province: { type: String, trim: true },
            country: { type: String, trim: true },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Please provide a valid email",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        phone: { type: String, trim: true },
        role: {
            type: String,
            enum: Object.values(Roles),
            default: Roles.ADOPTER,
            required: true,
        },
        status: { type: Boolean, default: true },
        resetToken: { type: String },
        resetTokenExpires: { type: Number },
        provider: {
            type: String,
            enum: ["email", "google", "facebook"],
            required: true,
            default: "email",
        },
        providerId: {
            type: String,
            validate: {
                validator: function (this: IUser) {
                    return this.provider === "email" || this.providerId;
                },
                message: "providerId is required for Google/Facebook login",
            },
        },
        googleId: { type: String },
        facebookId: { type: String },
        updatedBy: { type: String, trim: true },
    },
    { timestamps: true , discriminatorKey: "role"}
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
        this.password = BcryptUtils.createHash(this.password);
    }
    next();
});

const User = model<IUser>("User", userSchema);
export default User;
