"use client"
import { useCallback, useContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { VehicleTypeEnum } from "@/enums/vehicle-type.enum"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreateVehicleFormValues, createVehicleSchema } from "@/_core/domain/schemas/vehicle/create-vehicle-schema"
import { SubmitButton } from "@/components/atoms/submit-button/submit-button"
import { createVehicle } from "@/_core/infra/actions/vehicles/createVehicle"
import { toast } from "sonner"
import { VehiclesContext } from "@/context/vehicles-context"


const defaultValues: Partial<CreateVehicleFormValues> = {
  type: String(VehicleTypeEnum.CAR),
}

export function CreateVehicleForm() {
  const form = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues,
  })

  const { setShowCreateVehicleModal, setSubmitFetchVehicles } = useContext(VehiclesContext)

  const handleSubmit = useCallback(() => {
    const formValues = form.getValues()
    console.log('formValues:: ', formValues)
    createVehicle(formValues).then((value) => {
      toast('Veículo criado com sucesso!')
      setShowCreateVehicleModal(false);
      setSubmitFetchVehicles(true)
    }).catch((error) => {
      console.log('error:: ', error)
      toast("Erro ao cadastrar veículo", {
        description: String(error),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    })
  }, []);

  return (
    <div className="flex items-center">
      <Form {...form} >
        <form
          className="w-full">
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
                  <RadioGroup className="flex" defaultValue={defaultValues.type}>
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
