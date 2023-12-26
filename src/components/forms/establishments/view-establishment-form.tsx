"use client"
import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EstablishmentsContext } from '@/context/establishments-context'
import { CreateEstablishmentFormValues, createEstablishmentSchema } from "@/_core/domain/schemas/establishment/create-establishment-schema"


const defaultValues: Partial<CreateEstablishmentFormValues> = {
  // email: "gabryel@gmail.com",
}

export function ViewEstablishmentForm() {
  const form = useForm<CreateEstablishmentFormValues>({
    resolver: zodResolver(createEstablishmentSchema),
    defaultValues,
  })
  const { selectedEstablishments } = useContext(EstablishmentsContext)

  return (
    <div className="flex items-center space-x-2">
      <Form {...form}>
        <form className="w-full">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} value={selectedEstablishments[0].name} />
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
                    <Input {...field} value={selectedEstablishments[0].cnpj} />
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
                    <Input {...field} value={selectedEstablishments[0].email} />
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
                    <Input {...field} value={selectedEstablishments[0].address} />
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
                    <Input {...field} value={selectedEstablishments[0].phone} />
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
                  <FormLabel>Vagas para motos</FormLabel>
                  <FormControl>
                    <Input {...field} value={selectedEstablishments[0].motorcycleSlots} />
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
                  <FormLabel>Vagas para carros</FormLabel>
                  <FormControl>
                    <Input {...field} value={selectedEstablishments[0].carSlots} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
