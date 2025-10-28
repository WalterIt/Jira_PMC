import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import type { auth } from "@/auth";


const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
    // plugins: [inferAdditionalFields<typeof auth>(), adminClient({ ac, roles })],
})

export const {
    signIn,
    signUp,
    signOut,
    useSession 
} = authClient;