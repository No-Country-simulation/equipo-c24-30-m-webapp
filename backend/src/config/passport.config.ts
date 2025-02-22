import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserDAO from "../api/user/dao";
import User from "../api/user/model";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userDao = new UserDAO(User);
        let user = await userDao.find({ email: profile.emails?.[0].value });

        if (!user || user.length === 0) {
            const newUser = await userDao.create({
                email: profile.emails?.[0].value,
                userName: profile.displayName,
                provider: "google",
                providerId: profile.id,
            });
            return done(null, newUser);
        }

        return done(null, user[0]);
    } catch (err) {
        return done(err, false);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "displayName", "emails"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userDao = new UserDAO(User);
        let user = await userDao.find({ email: profile.emails?.[0].value });

        if (!user || user.length === 0) {
            const newUser = await userDao.create({
                email: profile.emails?.[0].value,
                userName: profile.displayName,
                provider: "facebook",
                providerId: profile.id,
            });
            return done(null, newUser);
        }

        return done(null, user[0]);
    } catch (err) {
        return done(err, null);
    }
}));
