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
import { CreateParkingRegisterFormValues, createParkingRegisterSchema } from "@/_core/domain/schemas/parking-registers/create-parking-register-schema"
import { SubmitButton } from "@/components/atoms/submit-button/submit-button"
import { createParkingRegister } from "@/_core/infra/actions/parking-registers/create-parking-register"
import { toast } from "sonner"
import { ParkingRegistersContext } from "@/context/parking-registers-context"
import { usePathname } from "next/navigation"
import { VehiclesContext } from "@/context/vehicles-context"


const defaultValues: Partial<CreateParkingRegisterFormValues> = {
  vehicleType: String(VehicleTypeEnum.CAR),
}

export function CreateParkingRegisterForm() {
  const form = useForm<CreateParkingRegisterFormValues>({
    resolver: zodResolver(createParkingRegisterSchema),
    defaultValues,
  })

  const { setShowCreateParkingRegisterModal, setSubmitFetchParkingRegisters } = useContext(ParkingRegistersContext)
  const { selectedVehicles } = useContext(VehiclesContext)

  const pathname = usePathname()
  const useSelectedVehicle = pathname === '/vehicles'
  const handleSubmit = useCallback(() => {
    const formValues = form.getValues()
    console.log('formValues:: ', formValues)
    createParkingRegister({
      vehiclePlate: useSelectedVehicle ? selectedVehicles[0].plate : formValues.vehiclePlate,
      vehicleType: useSelectedVehicle ? String(selectedVehicles[0].type) : String(formValues.vehicleType),
    }).then((value) => {
      toast('Veículo criado com sucesso!')
      setShowCreateParkingRegisterModal(false);
      setSubmitFetchParkingRegisters(true)
    }).catch((error) => {
      console.log('error:: ', error)
      toast(error.message || "Erro ao registrar veículo")
    })
  }, []);

  return (
    <div className="flex items-center">
      <Form {...form} >
        <form
          className="w-full">
          <div className="grid gap-2">
            {useSelectedVehicle && selectedVehicles.length ? (
              <>
                <div className="flex flex-col space-y-2">
                  <FormLabel>Placa do veículo</FormLabel>
                  <span className="text-gray-500">
                    {selectedVehicles[0].plate}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <FormLabel>Tipo</FormLabel>
                  <span className="text-gray-500">
                  {selectedVehicles[0].brand} - {selectedVehicles[0].model} - {selectedVehicles[0].color}
                  </span>
                </div>
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="vehiclePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa do veículo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem {...field}>
                      <FormLabel>Tipo</FormLabel>
                      <RadioGroup className="flex" defaultValue={defaultValues.vehicleType}>
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
              </>
            )}
            <SubmitButton onClick={handleSubmit} type="button" />
          </div>
        </form>
      </Form>
    </div>
  )
}
