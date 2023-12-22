"use client"
import { use, useContext, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/atoms/icons/icons"
import { VehicleTypeEnum } from "@/enums/vehicle-type.enum"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { VehiclesContext } from "@/context/vehicles-context"
import { ListVehiclesFormValues, listVehiclesSchema } from "@/app/schemas/vehicle/list-vehicles-schema"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"


const defaultValues: Partial<ListVehiclesFormValues> = {
  // email: "gabryel@gmail.com",
}

export function ListVehiclesForm() {
  const form = useForm<ListVehiclesFormValues>({
    resolver: zodResolver(listVehiclesSchema),
    defaultValues,
  })
  const { fetchVehicles, isLoading, submitFetchVehicles } = useContext(VehiclesContext)

  useEffect(() => {
    console.log('submitFetchVehicles:: ', submitFetchVehicles)
    if (submitFetchVehicles) {
      form.handleSubmit(fetchVehicles)
    }
  }, [submitFetchVehicles])

  return (
    <div className="flex flex-row items-center space-x-2">
      <Form {...form}>
        <form onSubmit={() => form.handleSubmit(fetchVehicles)} className="space-y-8">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem {...field}>
                  <FormLabel>Tipo</FormLabel>
                  <RadioGroup defaultValue={String(VehicleTypeEnum.CAR)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={String(VehicleTypeEnum.CAR)} id="r1" />
                      <Label htmlFor="r1">Carro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={String(VehicleTypeEnum.MOTORCYCLE)} id="r2" />
                      <Label htmlFor="r2">Moto</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Entrada do veículo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2023-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Entrada do veículo no estacionamento
                  </FormDescription>
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
    </div>
  )
}
