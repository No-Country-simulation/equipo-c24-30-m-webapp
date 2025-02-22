// LIBRARIES
import bcrypt from "bcrypt";
// INTERFACES
import { IUser } from "../api/user/interface";

/**
 * Utility class for handling bcrypt password hashing and verification.
 */
export class BcryptUtils {
    /**
     * Generates a bcrypt hash for the provided password.
     *
     * @param password - The password to hash.
     * @returns The bcrypt hash of the password.
     */
    static createHash(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    /**
     * Verifies if the provided password matches the password hash stored for the given user.
     *
     * @param user - The user object containing the stored password hash.
     * @param password - The password to verify against the stored hash.
     * @returns `true` if the password matches the stored hash, `false` otherwise.
     */
    static isValidPassword(user: IUser, password: string) {
        return bcrypt.compareSync(password, user.password);
    }
}
