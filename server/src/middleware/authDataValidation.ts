import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/response";
import { emailVerificationSchema } from "../schema/authSchema";

export function emailDataValidation(req: Request, res: Response, next: NextFunction) {
    console.log("------Email Data Validation Middleware------");

    try {
        if(req.body === undefined || req.body === null) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }
        
        const { email } = req.body;

        if (!email || email === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        try {
            const value = emailVerificationSchema.validateSync(req.body);
            next();
        } catch (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR, (error as any).details));
        return;
    }
}