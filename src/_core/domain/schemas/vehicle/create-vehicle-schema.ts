
import * as z from "zod"

export const createVehicleSchema = z.object({
  brand: z.string()
    .min(2, {
      message: "Brand must be at least 2 characters.",
    })
    .max(30, {
      message: "Brand must not be longer than 30 characters.",
    }),
  model: z.string()
    .min(2, {
      message: "Model must be at least 2 characters.",
    })
    .max(30, {
      message: "Model must not be longer than 30 characters.",
    }),
  color: z.string()
    .min(2, {
      message: "Color must be at least 2 characters.",
    })
    .max(30, {
      message: "Color must not be longer than 30 characters.",
    }),
  plate: z.string()
    .min(2, {
      message: "Plate must be at least 2 characters.",
    })
    .max(30, {
      message: "Plate must not be longer than 30 characters.",
    }),
  type: z.string()
    .min(1, {
      message: "vehicleType must be at least 2 characters.",
    })
    .max(1, {
      message: "vehicleType must not be longer than 30 characters.",
    }),
})

export type CreateVehicleFormValues = z.infer<typeof createVehicleSchema>
