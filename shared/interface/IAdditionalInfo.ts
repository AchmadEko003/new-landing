export interface IAdditionalInfo {
  /** Unique identifier of the additional info */
  uid: string
  /** Name of the trip this info relates to */
  tripName: string
  /** Destination of the trip */
  destination: string
  /** Size of the group for the trip */
  groupSize: number
  /** Team associated with the trip */
  team: string
  /** Name of the additional info */
  name: string
  /** Caption for the additional info */
  caption: string
  /** Price of the additional info */
  price: number
}
