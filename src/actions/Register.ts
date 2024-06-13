"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";



export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success) {
        return {error : "Invalid fields"};
    }
    const {email, password, firstName, lastName} = validatedFields.data;
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, full_name: firstName+" "+lastName, password: password}),
    };
    const url = process.env.NEXT_PUBLIC_BACKEND_URL+"/users/signup"
    const response = await fetch(url, requestOptions);
    const data = await response.json()
    if (!response.ok){
        return {error:data.detail}
    }
    return {success : "Account created successfully"};
}