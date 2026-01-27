/**
 * Interface for booking package items
 */
export interface IBookingPackage {
  /** Unique identifier of the package */
  uid: string
  /** Name of the package */
  name: string
  /** Package caption/description */
  caption: string
  /** Package price */
  price: number
  /** Whether there are additional fees */
  additionalFee: boolean
  /** Minimum booking requirement */
  minimumBook: number
}

/**
 * Interface for extra package items
 */
export interface IExtraPackage {
  /** Unique identifier of the extra package */
  uid: string
  /** Name of the extra package */
  name: string
  /** Extra package caption/description */
  caption: string
  /** Extra package price */
  price: number
}

/**
 * Interface for booking detail data
 */
export interface IDetailBook {
  /** Name of the booking/trip */
  name: string
  /** List of banner image IDs */
  bannerList: string[]
  /** Start date of the trip */
  startDate: string
  /** End date of the trip */
  endDate: string
  /** Down payment amount */
  downPayment: number
  /** Array of available packages */
  package: IBookingPackage[]
  /** Array of available extra packages */
  extraPackage: IExtraPackage[]
}

/**
 * Interface for individual guest information
 */
export interface IGuest {
  /** Guest's full name as per passport */
  fullNameAsPerPassport: string
  /** Guest's title */
  gender: 'Mr' | 'Mrs' | 'Ms'
  /** Guest's email address */
  email: string
  /** Guest's WhatsApp number */
  whatsappNumber: string
}

/**
 * Interface for guest form data
 */
export interface IGuestForm {
  /** List of guests */
  guests: IGuest[]
}

/**
 * Interface for payment methods
 */
export interface IPaymentMethod {
  /** Payment method ID */
  id: string
  /** Payment method name */
  name: string
  /** Payment method type (bank, e-wallet, etc.) */
  type: 'bank' | 'e-wallet' | 'credit-card'
  /** Payment method icon/logo */
  icon?: string
  /** Account number or details */
  accountNumber?: string
  /** Additional fees for this payment method */
  fee?: number
}

/**
 * Interface for extra package selection per guest
 */
export interface IExtraPackageSelection {
  /** Extra package reference */
  packageUid: string
  /** Selected guests for this package */
  selectedGuestIndexes: number[]
}

/**
 * Interface for booking step state
 */
export interface IBookingStep {
  /** Current step number (1-4) */
  currentStep: number
  /** Selected package */
  selectedPackage?: IBookingPackage
  /** Selected extra packages with guest selection */
  selectedExtraPackages: IExtraPackageSelection[]
  /** Guest information */
  guestInfo?: IGuestForm
  /** Selected payment method */
  selectedPaymentMethod?: IPaymentMethod
  /** Total amount */
  totalAmount: number
}

// Gender yang umum—silakan sesuaikan kalau perlu
export type Gender = 'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Mstr' | 'Dr'

export interface Guest {
  name: string
  gender: Gender
  email?: string | null
  whatsappNumber?: string // optional kalau kosong
  whatsapp_number?: string // optional kalau kosong
  isPrimaryGuest: boolean
}

export interface AdditionalPackage {
  uid: string
  name: string
  caption: string
  price: number // dalam rupiah
}

export interface BookingData {
  noPesanan: string // e.g. "000130"
  tripName: string // e.g. "Japan City, Culture & Culinary (I) July 2025"
  jadwalKeberangkatan: string // e.g. "04/20/2025 - 04/30/2025" (raw text)
  useDiscount: boolean
  fixTotalPrice: number // total akhir dalam rupiah
  guest: Guest[]
  additionalPackages: AdditionalPackage[]
}

// Jika payload kamu dibungkus objek { data: ... }:
export interface BookingPayload {
  data: BookingData
}

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
