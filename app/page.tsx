'use client'

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const {data: session, isPending: loading} = authClient.useSession();

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-3xl text-blue-700">Loading...</div>
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session == null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome to Better-Auth App!</h1>
            <Button asChild size="lg">
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}!</h1>
            <Button variant="destructive" size="lg" onClick={() => authClient.signOut()}>
               Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
