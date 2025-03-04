import HTTP_STATUS from "../../constants/HttpStatus";
import { BcryptUtils } from "../../utils/bcrypt.utils";
import HttpError from "../../utils/HttpError.utils";
import UserDAO from "./dao";
import { IUser, UserLoginFields } from "./interface";
import User from "./model";
import config from "../../config/enviroment.config";
import { sign } from "jsonwebtoken";
import passport from "passport";
import "../../config/passport.config";

export default class UserService {
    static async loginUser(
        userData: UserLoginFields
    ): Promise<{ token: string, userWithoutPassword: Partial<IUser> }> {
        try {
            console.log("userData", userData);
            const userDao = new UserDAO(User);
            const userFound = await userDao.find({
                email: userData.email,
            });
            console.log("userFound", userFound);
            if (!userFound || userFound.length === 0) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }
            let user = userFound[0];
            console.log("user", user);
            const isPasswordValid = BcryptUtils.isValidPassword(
                user,
                userData.password
            );

            user = user.toObject();
            const {password, ...userWithoutPassword} = user; 
            console.log("isPasswordValid", isPasswordValid);

            if (!isPasswordValid) {
                throw new HttpError(
                    "Invalid credentials",
                    "INVALID_CREDENTIALS",
                    HTTP_STATUS.UNAUTHORIZED
                );
            }

            const token = sign(
                {
                    id: user._id,
                    role: user.role,
                    nbf: Math.floor(Date.now() / 1000),
                },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );

            return { token, userWithoutPassword };
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );

            throw error;
        }
    }

    static async oauthLogin(provider: "google" | "facebook", accessToken: string): Promise<{ token: string }> {
        return new Promise((resolve, reject) => {
            passport.authenticate(provider, { session: false }, async (err: Error, user: any) => {
                if (err || !user) {
                    return reject(new HttpError("Authentication failed", "AUTH_FAILED", HTTP_STATUS.UNAUTHORIZED));
                }
                const userDao = new UserDAO(User);
                let userFound = await userDao.find({ email: user.email });
                
                if (!userFound || userFound.length === 0) {
                    const newUser = await userDao.create({
                        email: user.email,
                        userName: user.displayName,
                        provider,
                        providerId: user.id,
                    });
                    userFound = [newUser];
                }
                const loggedUser = userFound[0];
                const token = sign({ id: loggedUser._id, role: loggedUser.role, nbf: Math.floor(Date.now() / 1000) }, process.env.JWT_SECRET!, { expiresIn: "1h" });
                resolve({ token });
            })({ body: { access_token: accessToken } });
        });
    }

    // static async generetePasswordResetToken(mail: string): Promise<{
    //     message: string;
    // }> {
    //     try {
    //         const userDao = new UserDAO(User);
    //         const userFound = await userDao.find({
    //             email: mail,
    //         });
    //         if (!userFound || userFound.length === 0) {
    //             throw new HttpError(
    //                 "Invalid credentials",
    //                 "INVALID_CREDENTIALS",
    //                 HTTP_STATUS.UNAUTHORIZED
    //             );
    //         }
    //         const user = userFound[0];

    //         const { token, expires } = generetePasswordResetToken();

    //         const userPayload = {
    //             resetToken: token,
    //             resetTokenExpires: expires,
    //             updatedAt: new Date(),
    //             updatedBy: user._id.toString(),
    //         };

    //         const userUpdated = await userDao.update(
    //             user._id.toString(),
    //             userPayload
    //         );

    //         if (!userUpdated) {
    //             throw new HttpError(
    //                 "Error during token generation",
    //                 "ERROR_GENERATING_TOKEN",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }

    //         const resetPasswordLink = `${config.FRONTEND_URL}/reset-password/${token}`;

    //         const emailPayload = {
    //             to: user.email,
    //             subject: "Password reset",
    //             html: `Click on the link to reset your password: <a href="${resetPasswordLink}"> Recuperar contraseña</a>`,
    //         };

    //         const emailSender = new MailSender(
    //             emailPayload.to,
    //             emailPayload.subject,
    //             emailPayload.html
    //         );

    //         const emailresult = await emailSender.sendMail();

    //         if (!emailresult) {
    //             throw new HttpError(
    //                 "Error sending email",
    //                 "ERROR_SENDING_EMAIL",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }

    //         return {
    //             message: "Token generated successfully and email sent",
    //         };
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }

    // static async resetPassword(
    //     token: string,
    //     newPassword: string
    // ): Promise<{ message: string }> {
    //     try {
    //         const userDao = new UserDAO(User);
    //         const userFound = await userDao.find({
    //             resetToken: token,
    //             resetTokenExpires: { $gt: new Date() },
    //         });
    //         if (!userFound || userFound.length === 0) {
    //             throw new HttpError(
    //                 "Invalid credentials",
    //                 "INVALID_CREDENTIALS",
    //                 HTTP_STATUS.UNAUTHORIZED
    //             );
    //         }
    //         const user = userFound[0];

    //         if (BcryptUtils.isValidPassword(user, newPassword)) {
    //             throw new HttpError(
    //                 "Password is the same as the current one",
    //                 "SAME_PASSWORD",
    //                 HTTP_STATUS.BAD_REQUEST
    //             );
    //         }

    //         const userPayload = {
    //             password: BcryptUtils.createHash(newPassword),
    //             resetToken: undefined,
    //             resetTokenExpires: undefined,
    //             updatedAt: new Date(),
    //             updatedBy: user._id.toString(),
    //         };

    //         const userUpdated = await userDao.update(
    //             user._id.toString(),
    //             userPayload
    //         );

    //         if (!userUpdated) {
    //             throw new HttpError(
    //                 "Error during password reset",
    //                 "ERROR_RESETING_PASSWORD",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }

    //         return {
    //             message: "Password reset successfully",
    //         };
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }

    static async getUserById(id: string): Promise<IUser | null> {
        try {
            const userDao = new UserDAO(User);
            const user = await userDao.read(id);

            if (!user) {
                throw new HttpError(
                    "User not found",
                    "USER_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            return user;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }

    static async getUsers(): Promise<IUser[]> { 
        try {
            const userDao = new UserDAO(User);
            const users = await userDao.findAll();

            if (!users) {
                throw new HttpError(
                    "Users not found",
                    "USERS_NOT_FOUND",
                    HTTP_STATUS.NOT_FOUND
                );
            }

            return users;
        } catch (err: any) {
            const error: HttpError = new HttpError(
                err.description || err.message,
                err.details || err.message,
                err.status || HTTP_STATUS.SERVER_ERROR
            );
            throw error;
        }
    }
       

    // static async updatePassword(
    //     user: ITokenPayload,
    //     newPassword: string
    // ): Promise<{ message: string }> {
    //     try {
    //         const userDao = new UserDAO(User);
    //         const currentUser = await userDao.read(user.id);

    //         if (!currentUser) {
    //             throw new HttpError(
    //                 "User not found",
    //                 "USER_NOT_FOUND",
    //                 HTTP_STATUS.NOT_FOUND
    //             );
    //         }

    //         if (BcryptUtils.isValidPassword(currentUser, newPassword)) {
    //             throw new HttpError(
    //                 "Password is the same as the current one",
    //                 "SAME_PASSWORD",
    //                 HTTP_STATUS.BAD_REQUEST
    //             );
    //         }

    //         const userPayload = {
    //             password: BcryptUtils.createHash(newPassword),
    //             updatedAt: new Date(),
    //             updatedBy: user.id,
    //         };

    //         const userUpdated = await userDao.update(user.id, userPayload);

    //         if (!userUpdated) {
    //             throw new HttpError(
    //                 "Error during password update",
    //                 "ERROR_UPDATING_PASSWORD",
    //                 HTTP_STATUS.SERVER_ERROR
    //             );
    //         }

    //         return {
    //             message: "Password updated successfully",
    //         };
    //     } catch (err: any) {
    //         const error: HttpError = new HttpError(
    //             err.description || err.message,
    //             err.details || err.message,
    //             err.status || HTTP_STATUS.SERVER_ERROR
    //         );
    //         throw error;
    //     }
    // }
}
