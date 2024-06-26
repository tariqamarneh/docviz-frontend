"use client"
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { Register } from "@/actions/Register";
import Input from "@/components/inputField";
import { ErrorMessage, SuccessMessage } from "@/components/MessageComponents";
import Navbar from "@/components/Navbar";

export default function Signup() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            terms: false
        },
    });

    const onSubmit = (values: RegisterSchemaType) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            Register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 pt-20">
                <div className="max-w-md w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Start your journey with us
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Create an account to access our services and begin your experience.
                    </p>
                </div>
                <div className="max-w-md w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <Input
                                htmlFor="firstName"
                                text="First name"
                                isPending={isPending}
                                type="text"
                                placeholder="John"
                                validator={register('firstName')}
                                error={errors.firstName?.message}
                            />
                            <Input
                                htmlFor="lastName"
                                text="Last name"
                                isPending={isPending}
                                type="text"
                                placeholder="Doe"
                                validator={register('lastName')}
                                error={errors.lastName?.message}
                            />
                        </div>
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
                        <Input
                            htmlFor="confirmPassword"
                            text="Confirm password"
                            isPending={isPending}
                            type="password"
                            placeholder="********"
                            validator={register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                        <div className="flex items-center mb-6">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                {...register('terms')}
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                        {errors.terms && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.terms.message}</p>}
                        <ErrorMessage message={error} />
                        <SuccessMessage message={success} />
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            {isPending ? 'Signing up...' : 'Sign up'}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <a href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}