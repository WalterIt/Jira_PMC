"use server"

// import { signOut } from "@/auth"
import { revalidatePath } from "next/cache";

export const logout = async (callbackUrl?: string) => {
    // await signOut({ redirectTo: `/login?callbackUrl=${encodeURIComponent(callbackUrl || "/")}` })

    revalidatePath("/");
    revalidatePath("/login");
    revalidatePath("/server");
    revalidatePath("/client");
    revalidatePath("/admin");
    revalidatePath("/settings");
}