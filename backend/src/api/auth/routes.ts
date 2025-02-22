import { Router } from "express";
import AuthController from "./controller";
import passport from "passport";

const authRouter = Router();


authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

// Rutas para Google y Facebook
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    res.redirect("/dashboard");
});

authRouter.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
authRouter.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
    res.redirect("/dashboard");
});

// Endpoint para login con token de OAuth
authRouter.post("/oauth/login", AuthController.oauthLogin);

export default authRouter;
