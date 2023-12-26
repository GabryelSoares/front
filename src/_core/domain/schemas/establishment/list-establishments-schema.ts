
import * as z from "zod"

export const listEstablishmentsSchema = z.object({
  name: z.string()
    .min(2, {
      message: "O nome do estabelecimento deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "O nome do estabelecimento não deve ter mais de 30 caracteres.",
    }),
  cnpj: z.string()
    .min(2, {
      message: "O CNPJ deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "O CNPJ não deve ter mais de 30 caracteres.",
    }),
})

export type ListEstablishmentsFormValues = z.infer<typeof listEstablishmentsSchema>
