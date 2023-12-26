"use client"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Icons } from "../atoms/icons/icons"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'

const accountFormSchema = z.object({
  password: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  // email: "gabryel@gmail.com",
  // password: "gabryel123",
}

export function SignInForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(formValues: AccountFormValues) {
    try {
      setIsLoading(true)
      const response = await signIn("credentials", {
        email: formValues.email.toLocaleLowerCase(),
        password: formValues.password,
        redirect: false
      });

      if(!response?.ok) {
        throw new Error(response?.error || "Erro na autenticação")
      }
      toast("Login realizado com sucesso!")
      router.push('/')
    } catch(error: any) {
      console.log('error:: ', error);
      toast(error?.message || "Erro na autenticação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
