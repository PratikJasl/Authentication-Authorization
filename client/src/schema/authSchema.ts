import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
})

export const signUpSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'), 
})

export const verifyEmailSchema = yup.object({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
})

export const verifyEmailOtpSchema = yup.object({
    otp: yup
        .string()
        .min(6, 'OTP must be 6 characters')
        .max(6, 'OTP must be 6 characters')
        .required('OTP is required'),
})
