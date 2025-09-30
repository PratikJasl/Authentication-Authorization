export interface existingUserCheck {
    status: boolean;
    data: {
        email: string;
        password: string;
        role: string;
        isVerified: boolean;
    } | null
}

export type LoginResponseData = {
    token: string;
    user: {
        email: string;
        role: string;
    };
} | null;

