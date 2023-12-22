"use client"
import { useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/atoms/icons/icons"
import { VehicleTypeEnum } from "@/enums/vehicle-type.enum"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { VehiclesContext } from "@/context/vehicles-context"
import { CreateVehicleFormValues, createVehicleSchema } from "@/app/schemas/vehicle/create-vehicle-schema"


const defaultValues: Partial<CreateVehicleFormValues> = {
  // email: "gabryel@gmail.com",
}

export function CreateVehicleForm() {
  const form = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues,
  })
  const { createVehicle, isLoading } = useContext(VehiclesContext)

  return (
    <div className="flex items-center space-x-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createVehicle)} className="space-y-8">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
