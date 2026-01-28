/**
 * Interface for Xendit Credit Card Token Request
 */
export interface IXenditTokenRequest {
  cardNumber: string
  cardHolderName: string
  expirationMonth: number
  expirationYear: number
  cvv: string
}

/**
 * Interface for Xendit Credit Card Token Response
 */
export interface IXenditTokenResponse {
  id: string
  object: string
  tokenId: string
  status: string
  cardNumber: string
  cardHolderName: string
  expirationMonth: number
  expirationYear: number
}

/**
 * Interface for Xendit Credit Card Charge Request
 */
export interface IXenditChargeRequest {
  tokenId: string
  amount: number
  invoiceId: string
  customerEmail: string
  customerName: string
}

/**
 * Interface for Xendit Credit Card Charge Response
 */
export interface IXenditChargeResponse {
  id: string
  object: string
  status: string
  amount: number
  capture: boolean
  cardData?: {
    tokenId: string
    cardNumber: string
  }
}

/**
 * Interface for CC Payment creation response
 */
export interface ICCPaymentResponseData {
  tokenId: string
  invoice: string
  chargeId?: string
  status: string
}

/**
 * Interface for CC Payment response
 */
export interface ICCPaymentResponse {
  data: ICCPaymentResponseData
  meta: {
    status: boolean
    message: string
    totalItem: number
    statusCode?: number
  }
}
