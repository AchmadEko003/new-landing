export interface IVoucherData {
  isValid: boolean
  discount: number
}

export interface IVoucherMeta {
  status: boolean
  message: string
  totalItem: number
}

export interface IVoucherResponse {
  data: IVoucherData
  meta: IVoucherMeta
}

export interface IVoucher {
  code: string
  isValid: boolean
  discount: number
  isApplied: boolean
}
