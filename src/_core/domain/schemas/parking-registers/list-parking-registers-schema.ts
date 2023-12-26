
import * as z from "zod"

export const listParkingRegistersSchema = z.object({
  plate: z.string()
    .min(7, {
      message: "Placa inválida",
    })
    .max(7, {
      message: "Placa inválida",
    }),
})

export type ListParkingRegistersFormValues = z.infer<typeof listParkingRegistersSchema>
