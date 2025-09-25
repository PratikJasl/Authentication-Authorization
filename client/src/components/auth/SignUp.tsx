import axios from "axios";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signUpSchema, type signUpFormData } from "../../schema/authSchema";
import { useRecoilValue } from "recoil";
import { emailState } from "../../atom/emailAtom";
import { signUpService } from "../../services/auth/signUpService";

function SignUp(){
    const navigate = useNavigate();
    const emailFromRecoil = useRecoilValue(emailState);
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(signUpSchema),
    });
    
    useEffect(() => {
        if(!emailFromRecoil){
            toast.error("Your email verification session has expired or was interrupted. Please start over.");
            navigate("/verify-email");
        }
    }, [emailFromRecoil, navigate]);
    
    //@dev Function to register new user.
    const registerUser = async (data: signUpFormData) => {
        setIsLoading(true);
        let response: any;
        console.log("Sending SignUp Request with Data:", data);
        try {
            response = await signUpService(data);
            if(response.status === 201){
                setRedirect(true);
                toast.success("SignUp Successful");
                reset();
            }else{
                toast.error(response.data.message || "Failed, Please try again.");
                navigate("/verify-email");
            } 
        } catch (error) {
            console.log("Reached catch block:", error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    if(redirect){
        return <Navigate to={'/login'} />
    }

    return(
        <form 
            onSubmit={handleSubmit(registerUser)} 
            className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-gray-10 shadow-gray-500 shadow-lg p-10 rounded-2xl"
        >

            <h1 className="text-3xl font-bold text-blue-600 mb-5 text-center">SignUp</h1>

            <div className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input
                    id="email"
                    disabled={true}
                    type="email"
                    value={emailFromRecoil}
                    //autoComplete="email"
                    //placeholder="Example@gmail.com"
                    {...register("email")}
                    className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                    />
                    {errors.email && (
                    <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                        {errors.email?.message}
                    </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Password:</label>
                    <input
                    id="password"
                    disabled={isLoading}
                    type="password"
                    placeholder="******"
                    {...register("password")}
                    autoComplete="true"
                    className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                    />
                    {errors.password && (
                    <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                        {errors.password?.message}
                    </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                    id="confirmPassword"
                    disabled={isLoading}
                    type="password"
                    placeholder="******"
                    autoComplete="true"
                    {...register("confirmPassword")}
                    className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                    />
                    {errors.confirmPassword && (
                    <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                        {errors.confirmPassword?.message}
                    </p>
                    )}
                </div>

                <div className="flex flex-col mb-5">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        {...register("role")}
                        className="w-full shadow-lg p-3 rounded-lg bg-white text-black"
                    >
                        <option value="">Select a role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="ENGINEER">Engineer</option>
                        <option value="EXPERT">Expert</option>
                    </select>
                    {errors.role && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                            {errors.role?.message}
                        </p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer"
            >
                {isLoading ? 'Signing Up...' : 'SignUp'}
            </button>
        </form>
    )
}

export default SignUp
