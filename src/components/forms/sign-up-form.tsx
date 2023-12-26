"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "../ui/input"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { signUp } from "@/_core/infra/actions/auth/signUp"
import { SubmitButton } from "../atoms/submit-button/submit-button"

const formSchema = z.object({
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
  motorcycleSlots: z.string().min(2, {
    message: "Motorcycle slots must be at least 10.",
  }),
  carSlots: z.string().min(2, {
    message: "Car slots must be at least 10.",
  }),
})

type AccountFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // email: "gabryel@gmail.com",
  // password: "gabryel123",
  // dob: new Date("2023-01-23"),
}

export function SignUpForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form action={signUp} className="space-y-8">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motorcycleSlots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vagas para moto</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carSlots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vagas para carro</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <SubmitButton />
        </div>
      </form>
    </Form>
  )
}
