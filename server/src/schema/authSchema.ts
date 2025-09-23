import * as yup from 'yup';

//@dev: Email verifcation schema and data type export.
export const emailVerificationSchema = yup.object({
    email: yup 
        .string()
        .email('Invalid email format')
        .required('Email is required'),
})
export type emailVerificationData = yup.InferType <typeof emailVerificationSchema>

//@dev: OTP verification schema and data type export.
export const otpVerificationSchema = yup.object({
    otp: yup
        .string()
        .length(6, 'OTP must be 6 digits long')
        .required('OTP is required'),
})
export type otpVerificationData = yup.InferType <typeof otpVerificationSchema>
