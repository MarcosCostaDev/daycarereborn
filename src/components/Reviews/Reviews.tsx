import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import type { Review } from '../../types'
import './Reviews.scss'

interface ReviewsProps {
  reviews: Review[]
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  const { t } = useTranslation()

  const getRatingText = (rating: number) => {
    const ratingMap = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five'
    }
    return t(`reviews.rating.${ratingMap[rating as keyof typeof ratingMap]}`)
  }

  return (
    <div className="reviews-grid">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <img src={review.image} alt={review.name} className="review-image" />
          <h3 className="review-name">{review.name}</h3>
          <div className="star-rating" aria-label={getRatingText(review.rating)}>
            {[...Array(review.rating)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>
          <p className="review-comment">{review.comment}</p>
          <small className="review-date">{review.date}</small>
        </div>
      ))}
    </div>
  )
} 