// LIBRARIES
import { Response, Request, NextFunction } from "express";
import { AnyZodObject, ZodTypeAny, ZodError } from "zod";
// CONSTANTS
import HTTP_STATUS from "../constants/HttpStatus";
import apiResponse from "../utils/apiResponse.utils";

const schemaValidator = (
    schema: AnyZodObject | null,
    paramsSchema: ZodTypeAny | null
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (schema) {
                schema.parse(req.body);
            }

            if (paramsSchema) {
                if (req.params.id) {
                    paramsSchema.parse(req.params.id);
                } else if (req.params.token) {
                    paramsSchema.parse(req.params.token);
                }
            }
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const response = apiResponse(
                    false,
                    error.issues.map((issue) => ({
                        path: issue.path[0],
                        message: issue.message,
                    }))
                );
                res.status(HTTP_STATUS.BAD_REQUEST).json(response);
                return;
            }
            const response = apiResponse(false, {
                message: "Internal server error",
            });
            res.status(HTTP_STATUS.SERVER_ERROR).json(response);
            return;
        }
    };
};

export default schemaValidator;
