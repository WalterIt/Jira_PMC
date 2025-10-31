import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
import { inferAdditionalFields, adminClient, customSessionClient, magicLinkClient } from "better-auth/client/plugins";
import type { auth } from "@/auth";
import { ac, roles } from "@/lib/permissions";


const authClient =  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        inferAdditionalFields<typeof auth>(), 
        adminClient({ ac, roles }),
        customSessionClient<typeof auth>(),
        magicLinkClient(),
    ],
})

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    admin,
    sendVerificationEmail,
    forgetPassword, 
    resetPassword,
    updateUser,
} = authClient;