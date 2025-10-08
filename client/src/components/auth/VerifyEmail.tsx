import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { yupResolver } from '@hookform/resolvers/yup';
import { emailVerificationSchema, type emailVerificationData} from "../../schema/authSchema";
import { logInStatus } from "../../atom/userAtom";
import { sendEmailVerificationOtp } from "../../services/auth/emailService";
import axios from "axios";

function VerifyEmail() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);
    const setEmail = useSetRecoilState(logInStatus);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(emailVerificationSchema)
    });

    const onSubmit = async (data: emailVerificationData) => {
        setIsLoading(true)
        setEmail({ email: data.email });
        console.log("Data Received from Verify Email Form:",data);
        try {
            const response = await sendEmailVerificationOtp(data);

            console.log("Success Response Received is", response);
            if(response.status === 200){
                setRedirect(true);
                toast.success("OTP has been sent successfully");
                reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                //@dev: Handle the non 2xx responses here.
                const apiError = error.response.data;
                toast.error(apiError.message || "OTP generation failed. Please try again.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if(redirect) {
        return <Navigate to="/verify-otp" />;
    }

    return(
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-gray-10 shadow-gray-500 shadow-lg p-10 rounded-2xl"
            >
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Email Verification</h1>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="self-start">Email:</label>
                            <input
                                id="email"
                                disabled={isLoading}
                                type="email"
                                autoComplete="email"
                                placeholder="example@tataelectronic.co.in"
                                {...register("email")}
                                className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                    {typeof errors.email?.message === "string" ? errors.email.message : ""}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="md:text-lg shadow-lg p-2 min-w-64 mt-5 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer"
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                    </button>
            </form>
        </>
    )
}

export default VerifyEmail;