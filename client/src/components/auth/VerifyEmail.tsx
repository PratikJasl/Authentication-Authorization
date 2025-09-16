import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyEmailSchema } from "../../schema/authSchema";


function VerifyEmail() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(verifyEmailSchema)
    });

    const onSubmit = (data: { email: string}) => {
        setIsLoading(true)
        console.log(data);
        setIsLoading(false)
        reset();
    };

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

                    <Link 
                        to='/'
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Back
                    </Link>

                    <button 
                        type="submit"
                        className="md:text-lg shadow-lg p-2 min-w-64 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer"
                    >
                        Verify Email
                    </button>
            </form>
        </>
    )
}

export default VerifyEmail;