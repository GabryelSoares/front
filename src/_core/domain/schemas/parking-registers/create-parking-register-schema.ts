
import * as z from "zod"

export const createParkingRegisterSchema = z.object({
  vehiclePlate: z.string()
    .min(7, {
      message: "Placa inválida",
    })
    .max(7, {
      message: "Placa inválida",
    }),
  vehicleType: z.string()
    .min(1, {
      message: "Tipo inválido",
    })
    .max(1, {
      message: "Tipo inválido",
    }),
})

export type CreateParkingRegisterFormValues = z.infer<typeof createParkingRegisterSchema>
