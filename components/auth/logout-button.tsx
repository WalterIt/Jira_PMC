"use client"

import React from "react"
import { logout } from "@/actions/logout"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOut } from "@/auth-client"

interface LoginButtonProps {
    children : React.ReactNode,
}

export const LogoutButton = ({children} : LoginButtonProps) => {
    const pathname = usePathname()
    const router = useRouter()

    async function onClick () {
        localStorage.clear() // Clear local storage
        sessionStorage.clear() // Clear session storage

        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
        })

        await signOut({
            fetchOptions: {
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    router.push("/login")
                }
            }
        });

        router.refresh() 
    }

    return (
        <span onClick={() => onClick()} className="cursor-pointer">
            {children}
        </span>
    )
}