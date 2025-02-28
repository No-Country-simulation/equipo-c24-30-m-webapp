import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HTTP_STATUS from "../constants/HttpStatus";
import HttpError from "../utils/HttpError.utils";
import apiResponse from "../utils/apiResponse.utils";
import config from "../config/enviroment.config";

export default async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let token: string | undefined;

    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Bearer ") === -1
    ) {
        const response = apiResponse(
            false,
            new HttpError(
                "Token is required",
                "TOKEN_REQUIRED",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        return;
    }

    token = req.headers.authorization?.substring(7);
    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const tokenData = JSON.stringify(decodedToken);

        const user = JSON.parse(tokenData);

        res.locals.user = user;
        next();
    } catch (error) {
        const response = apiResponse(
            false,
            new HttpError(
                "Invalid token",
                "INVALID_TOKEN",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        return;
    }
}
