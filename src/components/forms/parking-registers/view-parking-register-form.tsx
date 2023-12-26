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
import { CreateVehicleFormValues, createVehicleSchema } from "@/_core/domain/schemas/vehicle/create-vehicle-schema"


const defaultValues: Partial<CreateVehicleFormValues> = {
  // email: "gabryel@gmail.com",
}

export function ViewVehicleForm() {
  const form = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues,
  })
  const { selectedVehicles } = useContext(VehiclesContext)

  return (
    <div className="flex items-center space-x-2">
      <Form {...form}>
        <form className="w-full">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input {...field} value={selectedVehicles[0]?.brand} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
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
                    <Input {...field} value={selectedVehicles[0]?.model} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
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
                    <Input {...field} value={selectedVehicles[0]?.color} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
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
                    <Input {...field} value={selectedVehicles[0]?.plate} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem {...field}>
                  <FormLabel>Tipo</FormLabel>
                  <RadioGroup className="flex" value={String(selectedVehicles[0]?.type || '')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={String(VehicleTypeEnum.CAR)} id="r1" />
                      <Label htmlFor="r1">Carro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={String(VehicleTypeEnum.MOTORCYCLE)} id="r2" />
                      <Label htmlFor="r2">Moto</Label>
                    </div>
                  </RadioGroup>
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
