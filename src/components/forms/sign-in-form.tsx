"use client"
import { useContext, useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Icons } from "../atoms/icons/icons"

import {
  Form
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { SessionContext } from "@/context/session-context"
import axios from "axios"
import { th } from "date-fns/locale"
// import axios from "../libs/axios/axios"
// import { useSigninMutation } from "@/store/authApi"

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

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  email: "gabryel@gmail.com",
  password: "gabryel123",
  // dob: new Date("2023-01-23"),
}

export function SignInForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { updateSession } = useContext(SessionContext);
  
  async function onSubmit(formValues: AccountFormValues) {
    
    axios.post(process.env.NEXT_PUBLIC_API_URL +'/auth/sign-in', formValues).then((res) => {
      if(!res.data?.accessToken){
        throw new Error('Invalid credentials')
      }
      updateSession({
        isAuthenticated: true,
        establishment: res.data.establishment,
      })
      if(typeof window !== 'undefined') {
        localStorage.setItem('accessToken', res.data.accessToken)
      }
      toast({
        title: "Signed In",
      })
    }).catch((err) => {
      console.log(err);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(formValues, null, 2)}</code>
          </pre>
        ),
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  )
}
