export type BoundaryPeriod = 'daily' | 'weekly' | 'monthly'

/** The inDrive earning target the user must reach to finance the car. */
export interface Boundary {
  /** Target amount to reach within one period, in PHP. */
  amount: number
  period: BoundaryPeriod
}

export interface Ride {
  id: string
  /** ISO date-time the ride was completed. */
  date: string
  /** Fare earned for this ride, in PHP. */
  fare: number
  note?: string
}

export type RideInput = Pick<Ride, 'fare' | 'note'> & { date?: string }
