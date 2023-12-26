"use client"
import { useCallback, useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/atoms/icons/icons"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { EstablishmentsContext } from "@/context/establishments-context"
import { UpdateEstablishmentFormValues, updateEstablishmentSchema } from "@/_core/domain/schemas/establishment/update-establishment-schema"
import { SubmitButton } from "@/components/atoms/submit-button/submit-button"
import { updateEstablishment } from "@/_core/infra/actions/establishments/update-establishment"
import { toast } from "sonner"


const defaultValues: Partial<UpdateEstablishmentFormValues> = {
  // email: "gabryel@gmail.com",
}

export function UpdateEstablishmentForm() {
  const form = useForm<UpdateEstablishmentFormValues>({
    resolver: zodResolver(updateEstablishmentSchema),
    defaultValues,
  })
  const { selectedEstablishments, setSubmitFetchEstablishments, setShowUpdateEstablishmentModal } = useContext(EstablishmentsContext)

  const handleSubmit = useCallback(() => {
    const formValues = form.getValues()
    console.log('formValues:: ', formValues)
    updateEstablishment(formValues, selectedEstablishments[0].id).then(() => {
      toast('Estabelecimento atualizado com sucesso!')
      setSubmitFetchEstablishments(true)
      setShowUpdateEstablishmentModal(false)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao atualizar estabelecimento")
    })
  }, [form, selectedEstablishments]);

  useEffect(() => {
    if(selectedEstablishments.length > 0) {
      form.setValue("name", selectedEstablishments[0].name);
      form.setValue("cnpj", selectedEstablishments[0].cnpj);
      form.setValue("email", selectedEstablishments[0].email);
      form.setValue("address", selectedEstablishments[0].address);
      form.setValue("phone", selectedEstablishments[0].phone);
      form.setValue("motorcycleSlots", String(selectedEstablishments[0].motorcycleSlots));
      form.setValue("carSlots", String(selectedEstablishments[0].carSlots));
    }
  }, [selectedEstablishments]);

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
                  <FormLabel>Vagas para motos</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <SubmitButton onClick={handleSubmit} type="button" />
          </div>
        </form>
      </Form>
    </div>
  )
}
