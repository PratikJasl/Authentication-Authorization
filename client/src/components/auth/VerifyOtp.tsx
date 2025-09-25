import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { yupResolver } from '@hookform/resolvers/yup';
import { emailState } from "../../atom/userAtom";
import { verifyEmailOtpSchema, type verifyOtpData } from "../../schema/authSchema";
import { otpVerification } from "../../services/auth/otpService";

function VerifyOTP(){
    const [ isLoading, setIsLoading ] = useState(false);
    const [ redirect, setRedirect ] = useState(false);
    //const [ isResending, setIsResending ] = useState(false);
    //const [coolDownTimer, setCoolDownTimer] = useState(0);
    const emailFromRecoil = useRecoilValue(emailState);
    //const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(verifyEmailOtpSchema),
    });

    //@dev: useEffect for handling the countdown logic
    // useEffect(() => {
    //     if (coolDownTimer > 0) {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current);
    //         }
    //         timerRef.current = setInterval(() => {
    //             setCoolDownTimer((prev) => prev - 1);
    //         }, 1000);
    //     } else {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current);
    //             timerRef.current = null;
    //         }
    //         setIsResending(false); //@dev: Enable resend button when timer runs out
    //     }

    //     //@dev: Clean-up function
    //     return () => {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current);
    //         }
    //     };
    // }, [coolDownTimer]);

    useEffect(() => {
        if(!emailFromRecoil){
            toast.error("Your email verification session has expired or was interrupted. Please start over.");
            navigate("/verify-email");
        }
    }, [emailFromRecoil, navigate]);

    // async function sendOTP(){
    //     if (isResending) {
    //         return;
    //     }

    //     const email = emailFromRecoil;
    //     if (!email) {
    //         toast.error("Email not found. Please go back to reset password.");
    //         setIsResending(false);
    //         setCoolDownTimer(0);
    //         return;
    //     }

    //     //@dev: Set isResending and coolDownTimer.
    //     setIsResending(true);
    //     setCoolDownTimer(30);

    //     try {
    //         let response = await sendEmailVerificationOtp({email: email});
    //         if(response.status === 200){
    //             toast.success("OTP has been send");
    //         }else{
    //             toast.error(response.data.message || "OTP generation failed. Please try again.");
    //         }
    //     } catch (error) { 
    //         if (axios.isAxiosError(error) && error.response) {
    //             toast.error(error.response.data.message);
    //         } else {
    //             console.error("An unexpected error occurred:", error);
    //             toast.error("An unexpected error occurred. Please try again.");
    //         }
    //     }
    // }

    async function onSubmit(data: verifyOtpData){
        setIsLoading(true);
        const email = emailFromRecoil;
        console.log("Email Received from recoil is:", email)
        console.log("Data Received from form:", data);

        try {
            if (!email) {
                toast.error("Email not found. Please try the email verification process again.");
                setIsLoading(false);
                return;
            }
            let response = await otpVerification({otp: data.otp});
            if(response.status === 200){
                setRedirect(true);
                toast.success("Email Verified Successfully");
                reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                //@dev: Handle the non 2xx responses here.
                const apiError = error.response.data;
                toast.error(apiError.message || "Email verification failed. Please try again.");
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }finally {
            setIsLoading(false);
        }
    }

    if(redirect){
        return <Navigate to={'/signup'} />
    }

    return(
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)}  
                className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-gray-10 shadow-gray-500 shadow-lg p-10 rounded-2xl"
            >
                <div>
                    <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">OTP Verification</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Enter Otp:</label>
                        <input 
                            type="text"
                            placeholder="******"
                            id="otp"
                            {...register("otp")}
                            disabled = {isLoading}
                            className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64 mb-1"
                        />
                        {errors.otp && (
                            <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                                {typeof errors.otp?.message === "string" ? errors.otp.message : ""}
                            </p>
                        )}
                    </div>

                    {/* <div className="">
                        <h3>If you didn't receive a code,  
                            <a 
                                onClick={sendOTP} 
                                className={`
                                    text-green-500 p-1
                                    ${isResending ? 'cursor-not-allowed opacity-60' : 'hover:text-green-300 hover:cursor-pointer'}
                                `}
                            >
                                {isResending ? `resend (${coolDownTimer}s)` : 'resend'}
                            </a>
                        </h3>
                    </div> */}

                    <div>
                        <button 
                            type="submit"
                            disabled = {isLoading}
                            className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer"
                        >
                            {isLoading ? "Verifying..." : "Verify"}
                        </button>
                    </div>
                </div>
                
                <Link 
                    to="/Verify-email" 
                    className="flex flex-row md:mt-2 mt-1 items-center justify-center gap-1 text-green-500 hover:text-green-300"
                > 
                    {/* <ArrowLeftIcon className="h-5 w-5" /> */}
                    Back
                </Link>
            </form>
        </>
    )
}

export default VerifyOTP