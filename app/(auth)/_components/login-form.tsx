"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import {  useState, useTransition } from "react";
import {  useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/auth-client";
import { toast } from "sonner";


export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl")
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email Already in use with a different Provider!!" : "";
    const [isTwoFactor,setTwoFactor] = useState(false)
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues : {
            email: "", 
            password: "",
            code: "",
        }
    })

     const onSubmit = (values: z.infer<typeof LoginSchema>) => {
         setError("")
         setSuccess("")
         console.log("Login Form Values: ", values)

        startTransition(() => {
          signIn.email({
            email: values.email,
            password: values.password,
            })
            .then((data) => {
              if (data.error) {
                setError(data.error.message);
                toast.error(data.error.message);
              } else {
                setSuccess("Conta criada com sucesso!");
                toast.success("Conta criada com sucesso!");
              }
            })
            .catch((err) => {
              setError(err?.message || "Erro ao criar conta");
              toast.error(err?.message || "Erro ao criar conta");
            });
        });          
         
     }

    return (
      <CardWrapper
        headerLabel="Welcome Back!"
        backButtonLabel="Dont Haven't Any Account?"
        backButtonHref="/register"
        showSocial
      >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {isTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!isTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="px-0 font-normal"
                        >
                          <Link href="/reset">Forgot password?</Link>
                        </Button>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              {isTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
}