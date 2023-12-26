
import * as z from "zod"

export const listVehiclesSchema = z.object({
  plate: z.string()
    .min(2, {
      message: "Plate must be at least 2 characters.",
    })
    .max(30, {
      message: "Plate must not be longer than 30 characters.",
    }),
  type: z.string(),
  entry: z.date(),
  exit: z.date(),
})

export type ListVehiclesFormValues = z.infer<typeof listVehiclesSchema>
