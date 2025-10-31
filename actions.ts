"use server"

import type { PaymentFormData } from "./validators"

type PixDetails = {
  qr_code_url: string
  qr_code_text: string
  amount: number
  items: { name: string; price: number; image: string }[]
}

type PaymentResult = {
  success: boolean
  error?: string
  pixDetails?: PixDetails
}

async function getAccessToken() {
  const clientId = process.env.SYNCPAY_CLIENT_ID
  const clientSecret = process.env.SYNCPAY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Missing SyncPayments API credentials")
  }

  const response = await fetch("https://api.syncpayments.com.br/api/partner/v1/auth-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!response.ok) {
    console.error("Failed to get access token:", await response.text())
    throw new Error("Failed to authenticate with payment provider")
  }

  const data = await response.json()
  return data.access_token
}

export async function processPaymentAction(
  data: PaymentFormData & { amount: number; items: { name: string; price: number; image: string }[] },
): Promise<PaymentResult> {
  try {
    const accessToken = await getAccessToken()

    const transactionData = {
      amount: data.amount,
      description: data.items.map((item) => item.name).join(", "),
      client: {
        name: data.cardName,
        email: data.email,
        phone: data.phone.replace(/\D/g, ""),
        cpf: "00000000000",
      },
    }

    const response = await fetch("https://api.syncpayments.com.br/api/partner/v1/cash-in", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      console.error("Failed to create payment:", errorBody)
      const errorMessage = errorBody.message || "Falha ao gerar cobrança PIX. Tente novamente."
      return {
        success: false,
        error: errorMessage,
      }
    }

    const paymentResult = await response.json()

    if (!paymentResult.pix_code) {
      console.error("Invalid PIX details from API:", paymentResult)
      return {
        success: false,
        error: "Não foi possível obter os detalhes do PIX do provedor de pagamento.",
      }
    }

    const pixDetails: PixDetails = {
      qr_code_url: paymentResult.pix_code,
      qr_code_text: paymentResult.pix_code,
      amount: data.amount,
      items: data.items,
    }

    return {
      success: true,
      pixDetails: pixDetails,
    }
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro inesperado."
    return {
      success: false,
      error: `Ocorreu um erro inesperado. Por favor, tente novamente. Detalhes: ${errorMessage}`,
    }
  }
}
