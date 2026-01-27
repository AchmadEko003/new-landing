/**
 * Interface for Virtual Account (VA) details in payment response
 */
export interface IVirtualAccount {
  /** Virtual account number */
  va: string
  /** Bank code (e.g., BNI, BCA, etc.) */
  bankCode: string
  /** Customer name */
  custName: string
  /** Payment amount */
  amount: number
  /** Expiration date/time */
  expired: string
}

/**
 * Interface for payment creation response data
 */
export interface IPaymentResponseData {
  /** Virtual account details */
  va: IVirtualAccount
  /** Invoice number */
  invoice: string
}

/**
 * Interface for payment creation response metadata
 */
export interface IPaymentResponseMeta {
  /** Request status */
  status: boolean
  /** Response message */
  message: string
  /** Total items (usually 0 for payment responses) */
  totalItem: number
  statusCode?: number
}

/**
 * Interface for complete payment creation response
 */
export interface IPaymentResponse {
  /** Response data */
  data: IPaymentResponseData
  /** Response metadata */
  meta: IPaymentResponseMeta
}
