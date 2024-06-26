import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
})


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string()
        .min(8, {
            message: "Password must be at least 8 characters long"
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, {
        message: "First name is required"
    }),
    lastName: z.string().min(1, {
        message: "Last name is required"
    }),
    terms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
