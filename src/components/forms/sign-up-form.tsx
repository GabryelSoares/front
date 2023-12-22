"use client"
import { useContext, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Icons } from "../atoms/icons/icons"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { SessionContext } from "@/context/session-context"
import { api } from "@/lib/api"

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
  const [isLoading, setIsLoading] = useState(false)
  const { updateSession } = useContext(SessionContext);

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    console.log('onSubmit!');
    try {
      setIsLoading(true)
      console.log('formValues:: ', formValues)
      const response = await api<any>('/auth/sign-up', {
        method: 'POST', // Adicione esta linha para indicar que é uma solicitação POST
        body: JSON.stringify({
          ...formValues,
          carSlots: parseInt(formValues.carSlots || '10'),
          motorcycleSlots: parseInt(formValues.motorcycleSlots || '10')
        })
      })
      console.log('response:: ', response)
      if(response.data?.accessToken) {
        updateSession({
          isAuthenticated: true,
          establishment: response.data.establishment,
        })
        if(typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.data.accessToken)
        }
        toast({
          title: "Usuário cadastrado com sucesso",
        })
      }
      throw new Error('Erro ao cadastrar usuário')
    } catch(error) {
      toast({
        title: "Erro ao cadastrar usuário",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin bg-red-500" />
            )}
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
