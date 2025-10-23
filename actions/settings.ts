"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/custom-auth"
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { revalidatePath } from "next/cache"

export const settings = async (values : z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if (!user) return {error : "Unauthorized!!"}

    const dbUser = await getUserById(user.id)
    
    if(!dbUser) return {error : "Unauthorized!!"}

    if(user.isOauth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    // if(values.password !== values.newPassword) return {error : "Passwords Don't Match!"}

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id) {
            return {error : "Email Already Exists!!"}
        }
        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {success : "Verification Email Sent!"}
    }


    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if (!passwordMatch) {
            return {error : "Incorrect Password!"}
        }

        const hashNewPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashNewPassword
        values.newPassword = undefined
    }


    await db.user.update({
        where : {id : dbUser.id},
        data: {
            ...values
        }
    })


    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/server");
    revalidatePath("/client");
    revalidatePath("/admin");
    revalidatePath("/settings");


    return {success : "Settings Updated!"} 
}