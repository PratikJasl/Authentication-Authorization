import * as yup from 'yup';

//@dev: Email verifcation schema and data type export.
export const emailVerificationSchema = yup.object({
    email: yup 
        .string()
        .email('Invalid email format')
        .required('Email is required'),
})
export type emailVerificationData = yup.InferType <typeof emailVerificationSchema>