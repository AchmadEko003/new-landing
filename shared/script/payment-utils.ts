/**
 * Payment utility functions and types
 */

export interface PaymentOrderData {
  orderId: string
  bookingCode: string
  tripName: string
  startDate: string
  endDate: string
  totalGuests: number
  guests: GuestInfo[]
  packages: OrderPackage[]
  extraPackages: OrderExtraPackage[]
  totalAmount: number
  downPayment?: number
  discount?: number
  finalAmount: number
  bankCode?: string
  paymentStatus: 'pending' | 'completed' | 'failed'
}

export interface GuestInfo {
  name: string
  gender: string
  email?: string
  whatsappNumber?: string
}

export interface OrderPackage {
  name: string
  quantity: number
  price: number
  subtotal: number
}

export interface OrderExtraPackage {
  name: string
  quantity: number
  price: number
  subtotal: number
}

export interface PaymentMethod {
  id: string
  name: string
  code: string
  type: 'bank' | 'credit_card'
  fee: number
  icon?: string
}

export interface VirtualAccountData {
  bankCode: string
  accountNumber: string
  accountName: string
  amount: number
  expiredAt: string
}

/**
 * Format payment data response from API
 */
export const formatPaymentOrderData = (data: any): PaymentOrderData => {
  return {
    orderId: data.orderId || data.id,
    bookingCode: data.noPesanan || data.bookingCode,
    tripName: data.tripName || data.name,
    startDate: data.startDate || data.jadwalKeberangkatan?.split(' - ')[0],
    endDate: data.endDate || data.jadwalKeberangkatan?.split(' - ')[1],
    totalGuests: data.guests?.length || 0,
    guests: data.guests || [],
    packages: data.packages || [],
    extraPackages: data.extraPackages || [],
    totalAmount: data.totalAmount || 0,
    downPayment: data.downPayment,
    discount: data.discount,
    finalAmount: data.finalAmount || data.totalAmount || 0,
    bankCode: data.bankCode,
    paymentStatus: data.paymentStatus || 'pending'
  }
}

/**
 * Calculate order summary
 */
export const calculateOrderSummary = (order: PaymentOrderData) => {
  const packageSubtotal = order.packages.reduce(
    (sum, pkg) => sum + pkg.subtotal,
    0
  )
  const extraPackageSubtotal = order.extraPackages.reduce(
    (sum, pkg) => sum + pkg.subtotal,
    0
  )
  const subtotal = packageSubtotal + extraPackageSubtotal
  const discounted = Math.max(0, subtotal - (order.discount || 0))

  return {
    packageSubtotal,
    extraPackageSubtotal,
    subtotal,
    discount: order.discount || 0,
    discounted,
    finalAmount: order.finalAmount || discounted
  }
}
