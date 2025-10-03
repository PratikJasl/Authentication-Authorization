import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../common/messages";
import { errorResponse } from "../common/response";
import jwt from 'jsonwebtoken';
import { otpVerificationSchema, emailVerificationSchema, signUpSchema, loginSchema } from "../schema/authSchema";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                role: string;
            };
        }
    }
}

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
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
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
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Middleware to validate incoming sign up data.
export function signUpDataValidation(req: Request, res: Response, next: NextFunction) {
    console.log("------Sign Up Data Validation Middleware------");
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

        const { email, password, role } = req.body;
        const otpToken = req.cookies.otpToken;
        console.log("Line number 97:", email, password, role, otpToken);

        if (!email || email === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (!password || password === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (!role || role === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (!otpToken || otpToken === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (otpToken == false) {
            res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
        }

        try {
            const value = signUpSchema.validateSync(req.body);
            next();
        } catch (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Middleware to validate incoming login data.
export function loginDataValidation(req: Request, res: Response, next: NextFunction) {
    console.log("------Login Data Validation Middleware------");
    try {
        if(req.body === undefined || req.body === null) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        const { email, password } = req.body;

        
        if (!email || email === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        if (!password || password === undefined) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.MISSING_FIELD));
            return;
        }

        try {
            const value = loginSchema.validateSync(req.body);
            next();
        } catch (error) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.VALIDATION_FAILED));
            return;
        }
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

//@dev: Middleware to validate the incoming request's.
export function requestValidation(req: Request, res: Response, next: NextFunction) {
    console.log("------Request Validation Middleware------");
    let token;
    try {
        if(req.cookies === undefined || req.cookies === null) {
            res.status(400).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
            return;
        }

        if(req.cookies && req.cookies.token) {
            token = req.cookies.token;
            console.log("Token from cookies:", token);
        }

        if(!token) {
            res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            console.log("Decoded JWT:", decoded);
            if (typeof decoded === "object" && decoded !== null && "email" in decoded && "role" in decoded) {
                req.user = {
                    email: (decoded as any).email,
                    role: (decoded as any).role
                };
            } else {
                res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
                return;
            }
        } catch (error) {
            console.log(ERROR_MESSAGES.UNAUTHORIZED, error);
            res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
            return;
        }

        next();
    } catch (error) {
        console.log(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("------Authorization Middleware------");

    if (!req.user || !req.user.role) {
      console.log("No user object inside the request body, check if request validation middleware is used");
      res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
      return;
    }

    const userRole = req.user.role;
    console.log(`User role: '${userRole}', Required roles: [${allowedRoles.join(', ')}]`);

    if (!allowedRoles.includes(userRole)) {
      console.log(ERROR_MESSAGES.UNAUTHORIZED)
      res.status(403).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
      return;
    }

    console.log("Authorization successful.");
    next();
  };
};