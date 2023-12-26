
import * as z from "zod"

export const createEstablishmentSchema = z.object({
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
  email: z.string().email({
    message: "Informe um email válido.",
  }),
  address: z.string()
    .min(2, {
      message: "O endereço deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "O endereço não deve ter mais de 30 caracteres.",
    }),
  phone: z.string()
    .min(2, {
      message: "O telefone deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "O telefone não deve ter mais de 30 caracteres.",
    }),
  motorcycleSlots: z.string()
    .min(2, {
      message: "O número de vagas para motocicletas deve ter pelo menos 2 caracteres.",
    })
    .max(4, {
      message: "O número de vagas para motocicletas não deve ter mais de 4 caracteres.",
    }),
  carSlots: z.string()
    .min(2, {
      message: "O número de vagas para carros deve ter pelo menos 2 caracteres.",
    })
    .max(4, {
      message: "O número de vagas para carros não deve ter mais de 4 caracteres.",
    }),
})

export type CreateEstablishmentFormValues = z.infer<typeof createEstablishmentSchema>
