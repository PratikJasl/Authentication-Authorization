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


//@dev: SignUp verification schema and data type export.
export const signUpSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    role: yup
        .string()
        .oneOf(['ADMIN', 'ENGINEER', 'EXPERT'], 'Invalid role')
        .required('Role is required'),
})
export type signUpData = yup.InferType <typeof signUpSchema>


//@dev: Login verification schema and data type export.
export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
})
export type loginData = yup.InferType <typeof loginSchema>


//@dev: SignUp verification schema and data type export.
export const signUpSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    role: yup
        .string()
        .oneOf(['ADMIN', 'ENGINEER', 'EXPERT'], 'Invalid role')
        .required('Role is required'),
})
export type signUpData = yup.InferType <typeof signUpSchema>


//@dev: Login verification schema and data type export.
export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
})
export type loginData = yup.InferType <typeof loginSchema>


//@dev: SignUp verification schema and data type export.
export const signUpSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    role: yup
        .string()
        .oneOf(['Admin', 'Engineer', 'Expert'], 'Invalid role')
        .required('Role is required'),
})
export type signUpData = yup.InferType <typeof signUpSchema>