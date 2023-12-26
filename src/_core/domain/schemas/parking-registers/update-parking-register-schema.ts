
import * as z from "zod"

export const updateParkingRegisterSchema = z.object({
  vehiclePlate: z.string()
    .min(7, {
      message: "Placa inválida",
    })
    .max(7, {
      message: "Placa inválida",
    }),
})

export type UpdateParkingRegisterFormValues = z.infer<typeof updateParkingRegisterSchema>
