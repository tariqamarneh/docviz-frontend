"use client"
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Login } from "@/actions/Login";
import Input from "@/components/inputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import Navbar from "@/components/Navbar";

export default function Signin() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {  
            Login(values)
                .then((data) => {
                    setError(data?.error);
                    if (!data?.error) {
                        setSuccess("Login successful!");
                    }
                });
        });   
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            <Navbar />
            <div className="flex flex-col pt-20 md:flex-row items-center justify-center min-h-screen px-4">
                <div className="max-w-md w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Continue your journey with us
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Sign in to access your account and explore our services.
                    </p>
                </div>
                <div className="max-w-md w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <form id="login" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            htmlFor="email"
                            text="Email"
                            isPending={isPending}
                            type="email"
                            placeholder="name@example.com"
                            validator={register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            htmlFor="password"
                            text="Password"
                            isPending={isPending}
                            type="password"
                            placeholder="********"
                            validator={register('password')}
                            error={errors.password?.message}
                        />
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <ErrorMessage error={error} />
                        <SuccessMessage success={success} />
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            {isPending ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}