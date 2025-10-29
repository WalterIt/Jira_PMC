"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
import { forgetPassword } from "@/auth-client";
import { toast } from "sonner";


export const ResetForm = () => {
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues : {
            email: "", 
        }
    })

    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
         // TODO: Make a function to check if email exists before sending reset email

          forgetPassword({
            email: values.email,
            redirectTo: "/auth/reset-password",
            fetchOptions: {
              onError: (ctx) => {
                setError(ctx.error.message);
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                toast.success("Reset link sent to your email.");
                setSuccess("Reset link sent to your email.");
                //   router.push("/auth/forgot-password/success");
              },
            },
          });
        }); 
    }

    return (
       <CardWrapper headerLabel="Reset Password" backButtonLabel="Back To Login" backButtonHref="/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4 ">

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Your Email..." type="email"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 


                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Send Reset Email
                    </Button>
                </form>
            </Form>
       </CardWrapper>
    )
}