import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string()
  .min(8, {
    message: "A senha deve conter ao menos 8 dígitos.",
  })
  .max(16, {
    message: "A senha deve conter no máximo 16 dígitos.",
  }),
})
