import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    return {token: session.data?.accessToken, token_type: session.data?.token_type}
};
