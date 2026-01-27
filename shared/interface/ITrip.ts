export interface ITrip {
  uid: string
  name: string
  price: string
  days: string
  countryName: string
  banner: string[]
}

export interface ITripCard {
  imageSrc: string
  title: string
  days: string
  summary?: string
  startPrice: number
  tripId?: string
  url?: string
}

export interface ITripExperience {
  uid: string
  name: string
}

export interface ITripTermsCondition {
  title: string
  content: string
  order: number
}

export interface ITripIncluded {
  title: string
  content: string
  order: number
  isIncluded: boolean
}

export interface ITripAccomodation {
  uid: string
  thumbnail: string[]
  name: string
  location: string
  basic: boolean
  content: string
}

export interface ITripFaq {
  title: string
  content: string
}

export interface ITripItinerary {
  banners: string[]
  title: string
  content: string
}

export interface ITripDetail {
  uid: string
  mapImage: string
  bannerImages: string[]
  country: string
  name: string
  headline: string
  summary: string
  days: string
  destination: string
  transportation: string
  meetingPoint: string
  groupSize: number
  team: string
  documentation: string
  price: number
  suitability: string
  itineraries: ITripItinerary[]
  faq: ITripFaq[]
  experience: ITripExperience[]
  termsCondition: ITripTermsCondition[]
  included: ITripIncluded[]
  accomodation: ITripAccomodation[] | null
  moreInformation: string | null
}

export interface ITripRating {
  custName: string
  review: string
  rating: number
  postTime: string
  tripDetail: {
    tripUid: string
    tripName: string
  }
}

export interface ITripScheduleList {
  uidSchedule: string
  timelines: string
  startDate: string
  endDate: string
  quota: number
  price: number
}

export interface ITripAvailableSchedule {
  year: number
  month: number
}
