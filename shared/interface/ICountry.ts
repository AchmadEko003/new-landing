export interface ICountry {
  uid: string
  name: string
  order: number
  imageName: string
}

export interface ICountryHeaderMenu {
  label: string
  to: string
}

export interface ICountryFavoriteLocation {
  bannerImages: string[]
  name: string
  uid: string
}

export interface ICountryUniqueExperience {
  bannerImages: string[]
  name: string
  uid: string
}

export interface ICountryTrip {
  tripBanner: string[]
  name: string
  uid: string
  summary: string
  startPrice: number
  days: number
}

export interface ICountryDetail {
  /** Unique identifier of the country detail */
  uid: string
  /** Name of the country detail */
  name: string
  /** Summary of the country detail */
  summary: string
  /** Array of banner image file names */
  bannerName: string[]
  /** Favorite locations related to the country */
  favoriteLocations: ICountryFavoriteLocation[]
  /** Unique experiences associated with the country */
  uniqueExperience: ICountryUniqueExperience[]
  /** Trips available for the country */
  trip: ICountryTrip[]
}
