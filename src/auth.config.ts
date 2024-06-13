import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginUser } from "@/actions/apiService"

import { LoginSchema } from "./schemas"


export default {
    providers: [
        Credentials({
            name: "Credentials",
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;
                    const response = await loginUser(email, password);
                    if (response.status == 200){
                        const user = await response.json()
                        return { token: user.access_token, token_type:user.token_type };
                    }
                }
                return null;
            }
        })
    ],
    trustHost: true,

} satisfies NextAuthConfig