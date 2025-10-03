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

export interface DebugSetupDto {
    stationName: string,
    errorCode: string,
    stepCode: string
    stepDescription: string
    location: string
    componentNames: string
    netSignal: string
    conclusion: string
    debugStepSuccess: string
    debugStepFail: string
    sequence: string
    idealDiodeRange: string
};


export interface DebugStepData{
    errorId:number
    stepCode: string
    stepDescription: string
    location: string
    componentNames: string
    netSignal: string
    conclusion: string
    debugStepSuccess: string
    debugStepFail: string
    sequence: string
    idealDiodeRange: string
}
