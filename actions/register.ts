"use server";

import * as z from "zod"
import { RegisterSchema } from "@/schemas";
// import bcrypt from "bcryptjs"
// import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { auth } from "@/auth";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, name } = validateFields.data
    // const hashedPassword = await bcrypt.hash(password, 10)

    // const existingUser = await getUserByEmail(email)

    // if (existingUser) {
    //     return { error: "Email Already Exists!" }
    // }


    // await db.user.create({
    //     data: {
    //         email,
    //         name,
    //         password : hashedPassword,
    //     }
    // })

    const verificationToken = await generateVerificationToken(email)
        // await sendVerificationEmail(
        //     verificationToken.email,
        //     verificationToken.token
        // )

        // return { success: "Confirmation Email Sent!" }
    
     try {
       await auth.api.signUpEmail({
         body: {
           name,
           email,
           password,
         },
       });

       return { error: null };
     } catch (err) {
       if (err instanceof Error) {
         return { error: "Oops! Something went wrong while registering!" };
       }

       return { error: "Internal Server Error" };
     }
}