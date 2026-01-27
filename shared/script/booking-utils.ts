export const formatCardNumber = (value: string): string => {
  const digitsOnly = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = digitsOnly.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts: string[] = []
  for (let i = 0; i < match.length; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  return parts.length ? parts.join(' ') : digitsOnly
}

export const formatExpiryDate = (value: string): string => {
  const digitsOnly = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (digitsOnly.length >= 2) {
    return `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`
  }
  return digitsOnly
}

export const isValidPhoneNumber = (value: string): boolean =>
  /^\d+$/.test(value)

export interface GuestSummary {
  whatsappNumber: string
  fullNameAsPerPassport: string
}

export const generateGuestId = (guest: GuestSummary): string => {
  const phoneLastFour = guest.whatsappNumber.slice(-4)
  const nameFirstThree = guest.fullNameAsPerPassport
    .substring(0, 3)
    .toUpperCase()
  return phoneLastFour + nameFirstThree
}
