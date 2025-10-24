// import GitHub from "next-auth/providers/github"
// import type { NextAuthConfig } from "next-auth"
import { betterAuth } from "better-auth";
// import Credentials from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "@/data/user";


// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

export default {
  providers: [
    // Google({
    //   clientId : process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
    // GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // }),
    // Credentials({
    //   async authorize(credentials) {
    //     const validateFields = LoginSchema.safeParse(credentials)
        
    //     if(validateFields.success) {
    //       const { email, password } = validateFields.data
    //       const user : any = await getUserByEmail(email)
          
    //       if(!user || !user.password) return null;
    //       const passwordMatch = await bcrypt.compare(password, user.password)
    //       if(passwordMatch) return user;
    //     }
    //     return null
    //   }
    // }),

  ],
  trustHost: true,
} 