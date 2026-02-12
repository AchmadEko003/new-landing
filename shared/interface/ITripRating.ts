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
