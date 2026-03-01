export interface IFavoriteLocation {
  uid: string
  name: string
  summary: string
  banner: string[]
}

export interface IFavoriteLocationDetailCountry {
  /** Banner image file name for the country */
  bannerName: string
  /** Name of the country */
  name: string
  /** Unique identifier of the country */
  uid: string
}

export interface IFavoriteLocationDetail {
  /** Unique identifier of the favorite location detail */
  uid: string
  /** Name of the favorite location detail */
  name: string
  /** Summary of the favorite location detail */
  summary: string
  /** Array of banner image file names */
  banner: string[]
  /** Country associated with this favorite location detail */
  countries: IFavoriteLocationDetailCountry[]
}
