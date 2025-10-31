"use client"

import { Suspense, useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Check, Copy, AlertTriangle } from "lucide-react"

type PixDetails = {
  qr_code_url: string
  qr_code_text: string
  amount: number
  items: { name: string; price: number; image: string }[]
}

const CountdownTimer = ({ minutes = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)

  useEffect(() => {
    if (timeLeft <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
  }

  return (
    <div
      style={{ backgroundColor: "#F5ECD2" }}
      className="font-montserrat text-base text-amber-900 flex justify-center items-center text-center w-full py-2"
    >
      <span className="pf-counter-label">O pagamento expira em</span>
      <span className="pf-counter font-semibold ml-1">{formatTime(timeLeft)}</span>
    </div>
  )
}

function PixPaymentPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [pixDetails, setPixDetails] = useState<PixDetails | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const data = searchParams.get("data")
    if (data) {
      try {
        const decodedData = JSON.parse(data)
        setPixDetails(decodedData)
      } catch (error) {
        console.error("Failed to parse pix details", error)
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os detalhes do pagamento PIX.",
        })
      }
    }
  }, [searchParams, toast])

  if (!pixDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando detalhes do pagamento...</p>
      </div>
    )
  }

  const { qr_code_text, amount, items } = pixDetails

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qr_code_text).then(() => {
      setIsCopied(true)
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="bg-slate-100 min-h-screen font-montserrat">
      <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-green-500 text-white p-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-10 w-10 shrink-0" />
            <div>
              <h1 className="text-xl font-bold">Pix gerado</h1>
              <p>Efetue o pagamento para finalizar sua compra.</p>
            </div>
          </div>
        </header>

        <CountdownTimer minutes={10} />

        <div className="p-6">
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4 text-center">Siga os passos abaixo para pagar</h2>
            <div className="flex items-center justify-start gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <p className="font-semibold">Copie o código PIX</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-sm whitespace-nowrap overflow-hidden text-ellipsis mb-4 font-bold">
            {qr_code_text}
          </div>

          <div className="text-center mb-6">
            <Button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full sm:w-auto"
            >
              {isCopied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
              {isCopied ? "Copiado!" : "Copiar código PIX"}
            </Button>
          </div>

          <div className="flex justify-center my-6">
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qr_code_text)}`}
              alt="PIX QR Code"
              width={250}
              height={250}
            />
          </div>

          <div className="my-8 space-y-4 text-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <p>Abra o app do seu banco preferido e selecione a opção PIX</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <p>
                Selecione a opção <span className="font-bold">Pix Copia e Cola</span> com o código do pix copiado e cole
                o código
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <p>Por fim, clique em confirmar pagamento</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-lg">Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                      <p>{item.name}</p>
                    </div>
                    <p className="font-bold">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <p>Total</p>
                <p>R$ {amount.toFixed(2).replace(".", ",")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center text-gray-600 text-xs p-6 space-y-3 bg-slate-100">
          <p className="text-gray-500 pt-4">© 2025 Cadastro De Franqueada. Todos os direitos reservados.</p>
        </footer>
      </main>
    </div>
  )
}

export default function PixPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PixPaymentPage />
    </Suspense>
  )
}
