"use server"

import bcrypt from "bcryptjs"
import * as z from "zod"
import { db } from "@/lib/db";
import { getResetPasswordTokenByToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if(!token) return {error : "Token Not Found!!"}

    const validateFields = NewPasswordSchema.safeParse(values)
    if (!validateFields.success) return {error : "Invalid Fields!"}

    const {password} = validateFields.data
    
    const existingToken = await getResetPasswordTokenByToken(token)
    if(!existingToken) return {error : "Invalid Token!"}
    
    const hasExpired =  new Date(existingToken.expires) < new Date();
    if(hasExpired) return { error: "Token Expired!" }
    
    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser) return { error: "Email Doesn't Exist!" }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await db.user.update({
        where : {id : existingUser.id},
        data : {password : hashedPassword}
    })

    await db.resetPasswordToken.delete({
        where : {id : existingToken.id}
    })

    return {success : "Password Updated!"}
}