"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas";

type RegisterResult = {
    success?: string;
    error?: string;
};

export const Register = async (values: RegisterSchemaType): Promise<RegisterResult> => {
    const validatedFields = RegisterSchema.safeParse(values);
    
    if (!validatedFields.success) {
        console.error("Validation error:", validatedFields.error);
        return { error: "Invalid fields. Please check your input." };
    }

    const { email, password, firstName, lastName } = validatedFields.data;

    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/users/signup";
    if (!url) {
        console.error("Backend URL is not defined");
        return { error: "Server configuration error. Please try again later." };
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                full_name: `${firstName} ${lastName}`,
                password
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Server response error:", data);
            return { error: data.detail || "An error occurred during registration. Please try again." };
        }

        return { success: "Account created successfully" };
    } catch (error) {
        console.error("Fetch error:", error);
        return { error: "Network error. Please check your connection and try again." };
    }
};