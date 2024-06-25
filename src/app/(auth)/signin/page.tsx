"use client"
import React, { useState, useTransition } from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Login } from "@/actions/Login";
import Input from "@/components/inputField";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import NavBar from "../../../components/Navbar";


export default function Signin() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<String | undefined>("");
    const [success, setSuccess] = useState<String | undefined>("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=> {  
            Login(values)
                .then((data)=>{
                    setError(data?.error);
            })
        });   
    }

    return (
        <>
        <div className="fixed w-screen">
            <NavBar/>
        </div>
        <div className="flex flex-col h-fill-available w-screen justify-center items-center md:flex-row">
            <div className="max-w-sm w-[80%] mx-auto text-black dark:text-white mb-10">
                <h1 className="mb-8 font-bold text-4xl ">
                    Continue your journey with us
                </h1>
                <p className="leading-relaxed">
                    Sign in to continue
                </p>
            </div>
            <form id="login" className="max-w-sm w-[80%] mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <Input htmlFor="email" text="Email" isPending={isPending} type="text" placeholder="name@airefme.com" validator={register('email')} error={errors.email?.message}/>
                <Input htmlFor="password" text="Password" isPending={isPending} type="password" placeholder="********" validator={register('password')} error={errors.password?.message}/>
                <div className="flex items-start mb-5 mt-5">
                    <div className="flex items-center h-5">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Don&apos;t have an account? <a href="/signup" className="hover:text-blue-600 underline">Sign Up</a></p>
                    </div>
                </div>
                <ErrorMessage error={error}/>
                <SuccessMessage success={success}/>
                <button disabled={isPending} type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
            </form>
        </div>
        </>
    );
}