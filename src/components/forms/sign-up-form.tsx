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
// {
//   "name": "string",
//   "cnpj": "string",
//   "email": "string",
//   "password": "string",
//   "address": "string",
//   "phone": "string",
//   "motorcycleSlots": 0,
//   "carSlots": 0
// }
const accountFormSchema = z.object({
  name: z.string().min(8, {
    message: "Name must be at least 8 characters.",
  }),
  cnpj: z.string().min(14, {
    message: "Name must be at least 14 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  address: z.string().min(8, {
    message: "Address must be at least 8 characters.",
  }),
  phone: z.string().min(8, {
    message: "Phone must be at least 8 characters.",
  }),
  motorcycleSlots: z.number().min(10, {
    message: "Motorcycle slots must be at least 0.",
  }),
  carSlots: z.number().min(10, {
    message: "Car slots must be at least 0.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // email: "gabryel@gmail.com",
  // password: "gabryel123",
  // dob: new Date("2023-01-23"),
}

export function SignUpForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { updateSession } = useContext(SessionContext);
  
  async function onSubmit(formValues: AccountFormValues) {
    
    axios.post(process.env.NEXT_PUBLIC_API_URL +'/auth/sign-up', formValues).then((res) => {
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
            <Input
              id="name"
              placeholder="name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="cnpj"
              placeholder="cnpj"
              type="text"
              autoCapitalize="none"
              autoComplete="cnpj"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="address"
              placeholder="address"
              type="text"
              autoCapitalize="none"
              autoComplete="address"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="phone"
              placeholder="phone"
              type="text"
              autoCapitalize="none"
              autoComplete="phone"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="motorcycleSlots"
              placeholder="motorcycleSlots"
              type="number"
              autoCapitalize="none"
              autoComplete="motorcycleSlots"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Input
              id="carSlots"
              placeholder="carSlots"
              type="number"
              autoCapitalize="none"
              autoComplete="carSlots"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
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
