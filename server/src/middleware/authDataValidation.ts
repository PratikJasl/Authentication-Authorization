import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/response";
import { otpVerificationSchema, emailVerificationSchema } from "../schema/authSchema";

//@dev: Middleware to validate incoming email.
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

//@dev: Middleware to validate incoming otp.
export function otpDataValidation(req: Request, res: Response, next: NextFunction) {
    console.log("------OTP Data Validation Middleware------");

    try {
        if(req.body === undefined || req.body === null) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if(!req.cookies || req.cookies.otpToken === undefined) {
            console.log("No cookies received", req.cookies);
            res.status(400).json(errorResponse(ERROR_MESSAGES.TRY_AGAIN));
            return;
        }

        const { otp } = req.body;
        const otpToken = req.cookies.otpToken;
        console.log("Line number 54:",otp, otpToken);

        if (!otp || otp === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (!otpToken || otpToken === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        try {
            const value = otpVerificationSchema.validateSync(req.body);
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
        