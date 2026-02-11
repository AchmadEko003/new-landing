// Booking confirmation interfaces
export interface IBookingPackage {
  uid: string
  quantity: number
}

export interface IBookingExtraPackage {
  uid: string
  quantity: number
  guest: string[]
}

export interface IBookingCustomer {
  gender: string
  name: string
  whatsappNumber: string
  nik: number
  email: string
  primaryGuest: boolean
}

export interface IBookingConfirmation {
  tripScheduleUid: string
  package: IBookingPackage[]
  extraPackage: IBookingExtraPackage[]
  voucherCode?: string
  customers: IBookingCustomer[]
  paidOff: boolean
  bankCode: string
}
