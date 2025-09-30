import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { logInStatus } from "../../atom/userAtom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type loginFormData } from "../../schema/authSchema";
import { loginService } from "../../services/auth/logInService";


function LogIn(){
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useRecoilState(logInStatus);
    
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
            resolver: yupResolver(loginSchema),
    });

    //@dev: Function to handle the form submission.
    const onSubmit = async (data: loginFormData) => {
        setIsLoading(true)
        console.log("Sending Login Request with Data:", data);
        let response: any;
        try {
            response = await loginService(data);
            if(response.status === 200){ 
                console.log("Login successful:", response.data.data);
                setLoginStatus({
                    isLoggedIn: true,
                    email: response.data.data.email,
                    role: response.data.data.role
                });                                 //@dev: Save login Status.
                console.log("Data stored in atoms is:", { loginStatus });
                toast.success("LogIn Successful");
                reset();
                navigate('/');                      //@dev: After successful login, redirect the user to the home page.
            }else{
                toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col items-center gap-3 lg:w-96 w-74 bg-gray-10 shadow-gray-500 shadow-lg p-10 rounded-2xl">

            <h1 className="md:text-3xl text-xl font-bold text-blue-500 mb-2">LogIn</h1>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="">Email:</label>
                    <input
                        id="email"
                        disabled={isLoading}
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        {...register("email")}
                        className="shadow-lg p-2 rounded-lg bg-white text-black min-w-64"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                            {typeof errors.email?.message === "string" ? errors.email.message : ""}
                        </p>
                    )}
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Password:</label>
                    <input
                        id="password"
                        disabled={isLoading}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        {...register("password")}
                        className="shadow-lg p-2 rounded-lg bg-white text-black"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 left-0 w-full">
                            {typeof errors.password?.message === "string" ? errors.password.message : ""}
                        </p>
                    )}
                </div>              
            </div>

            <Link to="/ForgotPassword" className="text-blue-500 underline hover:text-blue-300">Forgot password?</Link>

            <Link to="/verify-email" className="text-gray-500 hover:text-gray-300">Don't have an account? <span className="text-blue-500 underline hover:text-blue-300">Sign Up</span></Link>

            <button 
                type="submit"
                disabled={isLoading}
                className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer"
            >
                {isLoading ? 'Logging In...' : 'LogIn'}
            </button>
        </form>
    )
}

export default LogIn
