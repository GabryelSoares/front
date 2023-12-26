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
import { VehicleTypeEnum } from "@/enums/vehicle-type.enum"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { VehiclesContext } from "@/context/vehicles-context"
import { UpdateVehicleFormValues, updateVehicleSchema } from "@/_core/domain/schemas/vehicle/update-vehicle-schema"
import { SubmitButton } from "@/components/atoms/submit-button/submit-button"
import { updateVehicle } from "@/_core/infra/actions/vehicles/updateVehicle"
import { toast } from "sonner"


const defaultValues: Partial<UpdateVehicleFormValues> = {
  // email: "gabryel@gmail.com",
}

export function UpdateVehicleForm() {
  const form = useForm<UpdateVehicleFormValues>({
    resolver: zodResolver(updateVehicleSchema),
    defaultValues,
  })
  const { selectedVehicles, setSubmitFetchVehicles, setShowUpdateVehicleModal } = useContext(VehiclesContext)

  const handleSubmit = useCallback(() => {
    const formValues = form.getValues()
    console.log('formValues:: ', formValues)
    updateVehicle(formValues, selectedVehicles[0].id).then(() => {
      toast('Veículo atualizado com sucesso!')
      setSubmitFetchVehicles(true)
      setShowUpdateVehicleModal(false)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao atualizar veículo")
    })
  }, [form, selectedVehicles]);

  useEffect(() => {
    if(selectedVehicles.length > 0) {
      form.setValue("brand", selectedVehicles[0].brand);
      form.setValue("model", selectedVehicles[0].model);
      form.setValue("color", selectedVehicles[0].color);
      form.setValue("plate", selectedVehicles[0].plate);
      form.setValue("type", String(selectedVehicles[0].type));
    }
  }, [selectedVehicles]);

  return (
    <div className="flex items-center space-x-2">
      <Form {...form}>
        <form className="space-y-8">
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
                  <RadioGroup defaultValue={String(selectedVehicles[0].type)}>
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
            <SubmitButton onClick={handleSubmit} type="button" />
          </div>
        </form>
      </Form>
    </div>
  )
}
