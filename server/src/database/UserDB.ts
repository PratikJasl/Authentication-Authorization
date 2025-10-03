import { PrismaClient, Roles } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/messages";
import { existingUserCheck } from "../common/interface";

const prisma = new PrismaClient();

//@dev: Function to check existing user using email or userId.
export async function checkExistingUser(email: string): Promise<existingUserCheck> {
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
            return {
                status: true,
                data: existingUser
            }
        }else{
            return {
                status: false,
                data: null
            };
        }

    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}

//@dev: Function to add new user to DB.
export async function addNewUser(email: string, password: string, role: Roles): Promise<boolean> {
    try {
        if(!email || !password || !role){
            console.error(ERROR_MESSAGES.MISSING_FIELD);
            throw new Error(ERROR_MESSAGES.MISSING_FIELD);
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                role,
                isVerified: true
            }
        });
        if(newUser){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        throw error;
    }
}