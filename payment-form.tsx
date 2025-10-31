"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, Loader2 } from "lucide-react"
import { paymentSchema, type PaymentFormData } from "@/lib/validators"
import { useToast } from "@/hooks/use-toast"
import { processPaymentAction } from "@/lib/actions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PaymentFormProps {
  paymentAmount: number
  acceptOffer: boolean
  setAcceptOffer: (value: boolean) => void
  acceptOffer2: boolean
  setAcceptOffer2: (value: boolean) => void
  baseAmount: number
  offerAmount: number
}

export default function PaymentForm({
  paymentAmount,
  acceptOffer,
  setAcceptOffer,
  acceptOffer2,
  setAcceptOffer2,
  baseAmount,
  offerAmount,
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onTouched",
    defaultValues: {
      cardName: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(data: PaymentFormData) {
    setIsProcessing(true)

    const items = [
      {
        name: "Taxa De Cadastro Franqueada",
        price: baseAmount,
        image: "https://cadastro.franqueada.shop/wp-content/uploads/2025/07/cropped-BONUS-SUPORTE-MENOR-1.webp",
      },
    ]
    if (acceptOffer) {
      items.push({
        name: "Revenda Sem Estoque",
        price: offerAmount,
        image: "https://roupasbaratas.online/wp-content/uploads/2025/10/combo-bonus-5.png",
      })
    }
    if (acceptOffer2) {
      items.push({
        name: "Fontes das Lojas de R$10,00",
        price: offerAmount,
        image: "https://cadastro.franqueada.shop/wp-content/uploads/2025/05/combo-bonus.png",
      })
    }

    const result = await processPaymentAction({ ...data, amount: paymentAmount, items })

    if (result && result.success && result.pixDetails) {
      const queryParams = new URLSearchParams({
        data: JSON.stringify(result.pixDetails),
      })
      router.push(`/pix?${queryParams.toString()}`)
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao processar pagamento",
        description: result.error || "Por favor, verifique seus dados e tente novamente.",
      })
    }

    setIsProcessing(false)
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="pb-4 items-start">
              <div className="inline-block bg-slate-100 rounded-full px-4 py-2">
                <h2 className="font-montserrat text-[16px] font-bold" style={{ color: "#09090B" }}>
                  IDENTIFICAÇÃO
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-montserrat text-[14px] font-extrabold"
                      style={{ color: "#09090B", fontWeight: 800 }}
                    >
                      NOME COMPLETO
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="DIGITE SEU NOME COMPLETO" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-montserrat text-[14px] font-extrabold"
                      style={{ color: "#09090B", fontWeight: 800 }}
                    >
                      E-MAIL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input type="email" placeholder="SEU E-MAIL" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-montserrat text-[14px] font-extrabold"
                      style={{ color: "#09090B", fontWeight: 800 }}
                    >
                      TELEFONE/WHATSAPP
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="DIGITE O SEU NÚMERO DE TELEFONE" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute -top-3 left-4 bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
              COMPRE JUNTO
            </div>
            <Card
              className="overflow-hidden border-slate-200 pt-8 cursor-pointer bg-slate-50"
              onClick={() => setAcceptOffer(!acceptOffer)}
            >
              <div className="px-4 pb-0">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="accept-offer"
                    checked={acceptOffer}
                    onChange={() => {}}
                    className="h-6 w-6 rounded border-gray-300 accent-green-600 pointer-events-none"
                  />
                  <label htmlFor="accept-offer" className="font-semibold text-lg text-gray-800 cursor-pointer">
                    Sim, eu aceito!
                  </label>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-start gap-4">
                  <NextImage
                    src="https://roupasbaratas.online/wp-content/uploads/2025/10/combo-bonus-5.png"
                    alt="Revenda Sem Estoque"
                    width={100}
                    height={100}
                    className="rounded-md border-2 border-gray-200 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg">Revenda Sem Estoque</p>
                    <p className="text-sm mt-1 text-gray-600">
                      Comece a lucrar em até 48h SEM INVESTIR NADA. Use nosso sistema onde VOCÊ VENDE e NÓS ENVIAMOS
                      DIRETO PARA SEU CLIENTE.
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm text-red-500 line-through">R$ 19,90</span>
                      <span className="text-xl font-bold text-black">R$ 7,99</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card
            className="overflow-hidden border-slate-200 cursor-pointer bg-slate-50"
            onClick={() => setAcceptOffer2(!acceptOffer2)}
          >
            <div className="px-4 pt-4 pb-0">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="accept-offer-2"
                  checked={acceptOffer2}
                  onChange={() => {}}
                  className="h-6 w-6 rounded border-gray-300 accent-green-600 pointer-events-none"
                />
                <label htmlFor="accept-offer-2" className="font-semibold text-lg text-gray-800 cursor-pointer">
                  Sim, eu aceito!
                </label>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-start gap-4">
                <NextImage
                  src="https://cadastro.franqueada.shop/wp-content/uploads/2025/05/combo-bonus.png"
                  alt="Fontes das Lojas de R$10,00"
                  width={100}
                  height={100}
                  className="rounded-md border-2 border-gray-200 object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-lg">Fontes das Lojas de R$10,00</p>
                  <p className="text-sm mt-1 text-gray-600">
                    Uma seleção dos contatos usados por LOJISTAS. Acesso direto a quem vende barato para sua LOJA DE
                    R$10
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-sm text-red-500 line-through">R$ 19,90</span>
                    <span className="text-xl font-bold text-black">R$ 7,99</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full text-lg py-7 bg-green-600 hover:bg-green-700 text-white font-bold animate-pulse-scale"
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                PROCESSANDO...
              </>
            ) : (
              `PAGAR TAXA DE CADASTRO R$ ${paymentAmount.toFixed(2).replace(".", ",")}`
            )}
          </Button>

          <Card className="bg-card shadow-md">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                      <NextImage
                        src="https://cadastro.franqueada.shop/wp-content/uploads/2025/07/cropped-BONUS-SUPORTE-MENOR-1.webp"
                        alt="Taxa De Cadastro Franqueada"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Taxa De Cadastro Franqueada</p>
                    </div>
                  </div>
                  <p className="font-semibold">R$ {baseAmount.toFixed(2).replace(".", ",")}</p>
                </div>
                {acceptOffer && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <NextImage
                          src="https://roupasbaratas.online/wp-content/uploads/2025/10/combo-bonus-5.png"
                          alt="Revenda Sem Estoque"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Revenda Sem Estoque</p>
                      </div>
                    </div>
                    <p className="font-semibold">R$ {offerAmount.toFixed(2).replace(".", ",")}</p>
                  </div>
                )}
                {acceptOffer2 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <NextImage
                          src="https://cadastro.franqueada.shop/wp-content/uploads/2025/05/combo-bonus.png"
                          alt="Fontes das Lojas de R$10,00"
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Fontes das Lojas de R$10,00</p>
                      </div>
                    </div>
                    <p className="font-semibold">R$ {offerAmount.toFixed(2).replace(".", ",")}</p>
                  </div>
                )}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {paymentAmount.toFixed(2).replace(".", ",")}</span>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
