export interface Review {
  id: number
  name: string
  image: string
  rating: number
  date: string
  comment: string
  language: string
}

export interface Activity {
  id: number
  name: string
  description: string
}

export interface ReviewsData {
  reviews: Review[]
} 