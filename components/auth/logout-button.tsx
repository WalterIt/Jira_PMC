"use client"

import React from "react"
import { logout } from "@/actions/logout"
import { usePathname, useRouter } from "next/navigation"

interface LoginButtonProps {
    children : React.ReactNode,
}

export const LogoutButton = ({children} : LoginButtonProps) => {
    const pathname = usePathname()
    const router = useRouter()

    function onClick () {
        localStorage.clear() // Clear local storage
        sessionStorage.clear() // Clear session storage

        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
        })


        logout(pathname)
        router.refresh() 
    }

    return (
        <span onClick={() => onClick()} className="cursor-pointer">
            {children}
        </span>
    )
}