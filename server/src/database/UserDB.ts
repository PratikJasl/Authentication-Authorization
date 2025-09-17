import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { existingUserCheckResult } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to check existing user using email or userId.
export async function checkExistingUser(email: string): Promise<boolean> {
    try {
        if(!email){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            throw new Error(ERROR_MESSAGES.MISSING_FIELD);
        }

        //@check email exists or not
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return true;
        }else{
            return false;
        }

    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}