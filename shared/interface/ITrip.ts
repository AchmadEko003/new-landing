export interface ITrip {
  /** Unique identifier of the trip */
  uid: string;
  /** Name of the trip */
  name: string;
  /** Price of the trip, formatted as a string */
  price: string;
  /** Duration of the trip in days, formatted as a string */
  days: string;
  /** Country name where the trip takes place */
  countryName: string;
  /** List of banner image file names */
  banner: string[];
}

export interface ITripCard {
  imageSrc: string;
  title: string;
  days: string;
  summary?: string;
  startPrice: number;
  tripId?: string;
  url?: string;
}
