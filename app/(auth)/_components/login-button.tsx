'use client';

import { useRouter } from 'next/navigation'
import React from 'react'
import { useSession } from "@/auth-client";
import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
// import { LoginForm } from './login-form';


interface LoginButtonProps {
    children : React.ReactNode,
    mode? : "modal" | "redirect", 
    asChild? : boolean
}

const LoginButton = ({children, mode = "redirect", asChild} : LoginButtonProps) => {

const router = useRouter();
  const { data: session, isPending } = useSession();
  

  if (isPending) {
    return (
      <Button size="lg" className="opacity-50" asChild>
        <span>Get Started</span>
      </Button>
    );
  }

if (mode === "modal") {
  return (
    <span>TODO: Implement Modal</span>
//     <Dialog>
//       <DialogTrigger asChild={asChild}>
//         {children}
//       </DialogTrigger>
//       <DialogContent className="w-auto p-0 bg-transparent border-none">
//         <LoginForm />
//       </DialogContent>
//     </Dialog>
  )
}

function handleClick() {
    const href = session ? "/profile" : "/login";
    router.push(href);
}
  return (
    <span onClick={() => handleClick()} className="flex flex-col items-center gap-4 cursor-pointer">
        {children}
    {session && (
      <p className='flex items-center gap-2 text-xl text-blue-950 font-bold' >
        <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-green-900 data-[role=ADMIN]:bg-red-600"
          />
        Welcome back, {session.user.name}! 👋
      </p>
      )}

    </span>
  )
}

export default LoginButton