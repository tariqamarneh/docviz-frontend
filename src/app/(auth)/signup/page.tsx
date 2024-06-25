"use client"
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { Register } from "@/actions/Register";
import Input from "@/components/inputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import Navbar from "@/components/Navbar";

export default function Signup() {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<String | undefined>("");
    const [success, setSuccess] = useState<String | undefined>("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            Register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return (
        <>
            <div className="fixed w-screen">
                <Navbar/>
            </div>
            <div className="flex flex-col h-fill-available w-screen md:justify-center md:items-center md:flex-row pt-20">
                <div className="max-w-sm w-[80%] mx-auto text-black dark:text-white mb-10">
                    <h1 className="mb-8 font-bold text-4xl ">
                        Start your journey with us
                    </h1>
                    <p className="leading-relaxed">
                        Sign up to continue
                    </p>
                </div>
                <form className="max-w-sm mx-auto w-[80%] pb-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <Input htmlFor="firstname" text="First name" isPending={isPending} type="text" placeholder="Tariq" validator={register('firstName')} error={errors.firstName?.message} />
                        <Input htmlFor="lastname" text="Last name" isPending={isPending} type="text" placeholder="Naser" validator={register('lastName')} error={errors.lastName?.message} />
                    </div>
                    <Input htmlFor="email" text="Email" isPending={isPending} type="text" placeholder="name@airefme.com" validator={register('email')} error={errors.email?.message} />
                    <Input htmlFor="password" text="Password" isPending={isPending} type="password" placeholder="********" validator={register('password')} error={errors.password?.message} />
                    <Input htmlFor="confirmpassword" text="Confirm password" isPending={isPending} type="password" placeholder="********" validator={register('confirmPassword')} error={errors.confirmPassword?.message} />
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account? <a href="/signin" className="hover:text-blue-600 underline">Sign in</a></p>
                        </div>
                    </div>
                    <ErrorMessage error={error} />
                    <SuccessMessage success={success} />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                </form>
            </div>
        </>
    );
}
