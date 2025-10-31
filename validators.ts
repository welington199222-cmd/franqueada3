import { z } from "zod"

export const paymentSchema = z.object({
  cardName: z.string().min(2, { message: "O nome é obrigatório." }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  email: z.string().email({ message: "E-mail inválido." }),
  phone: z.string().min(10, { message: "O número de telefone é obrigatório." }),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
})

export type PaymentFormData = z.infer<typeof paymentSchema>
