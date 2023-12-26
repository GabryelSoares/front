"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/atoms/submit-button/submit-button"
import { ListEstablishmentsFormValues, listEstablishmentsSchema } from "@/_core/domain/schemas/establishment/list-establishments-schema"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { Filter } from "lucide-react"


const defaultValues: Partial<ListEstablishmentsFormValues> = {
  // email: "gabryel@gmail.com",
}

interface Props {
  onSubmit: () => void
}

export function ListEstablishmentsForm({ onSubmit }: Props) {
  const form = useForm<ListEstablishmentsFormValues>({
    resolver: zodResolver(listEstablishmentsSchema),
    defaultValues,
  })

  return (
    <Drawer>
      <DrawerTrigger><Filter /></DrawerTrigger>
      <DrawerContent className="z-60">
        <DrawerHeader>
          <DrawerTitle>Busca avançada</DrawerTitle>
          <DrawerDescription>Preencha os filtros desejados.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-row items-center space-x-2">
          <Form {...form}>
            <form className="w-full">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa</FormLabel>
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
                      <FormLabel>Placa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <SubmitButton onClick={onSubmit} type="button" />
              </div>
            </form>
          </Form>
        </div>
        {/* <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}
