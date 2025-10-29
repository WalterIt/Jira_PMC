"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import {  NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { newPassword } from "@/actions/new-password";
import { toast } from "sonner";
import { resetPassword } from "@/auth-client";


export const NewPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const token: string | null = searchParams.get("token")
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues : {
            password: "", 
        }
    })

    if (!token) router.push("/login");

    // http://localhost:3000/api/auth/reset-password/twKO05aiu5F0XQuQDELA3Hnt?callbackURL=%2Fauth%2Freset-password




    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
          resetPassword({
            newPassword: values.password,
            token: token as string | undefined,
            // redirectTo: "/auth/reset-password",
            fetchOptions: {
              onError: (ctx: any) => {
                setError(ctx.error.message);
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                toast.success("Password has been reset successfully!");
                setSuccess("Password has been reset successfully!");
                  router.push("/login");
              },
            },
          });
        }); 
    }

    return (
       <CardWrapper headerLabel="Enter New Password" backButtonLabel="Back To Login" backButtonHref="/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="******" type="password"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 


                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
       </CardWrapper>
    )
}