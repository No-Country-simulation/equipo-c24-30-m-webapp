import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserDAO from "../api/user/dao";
import User from "../api/user/model";
import config from "./enviroment.config";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userDao = new UserDAO(User);
                let user = await userDao.find({ providerId: profile.id, provider: "google" });

                if (!user || user.length === 0) {
                    user = [
                        await userDao.create({
                            email: profile.emails?.[0].value,
                            userName: profile.displayName,
                            provider: "google",
                            providerId: profile.id,
                        }),
                    ];
                }

                return done(null, user[0]);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET,
            callbackURL: "/auth/facebook/callback",
            profileFields: ["id", "displayName", "emails"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userDao = new UserDAO(User);
                let user = await userDao.find({ providerId: profile.id, provider: "facebook" });

                if (!user || user.length === 0) {
                    user = [
                        await userDao.create({
                            email: profile.emails?.[0].value,
                            userName: profile.displayName,
                            provider: "facebook",
                            providerId: profile.id,
                        }),
                    ];
                }

                return done(null, user[0]);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
