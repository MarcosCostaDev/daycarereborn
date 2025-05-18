import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import type { Theme } from '../../contexts/ThemeContext'
import type { Review } from '../../types'

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const ReviewCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid var(--baby-pink);
`

const StarRating = styled.div`
  color: #FFD700;
  margin: 0.5rem 0;
  display: flex;
  gap: 0.2rem;
`

const ReviewDate = styled.small`
  color: #666;
  margin-top: 0.5rem;
`

const ReviewComment = styled.p`
  margin: 1rem 0;
  line-height: 1.6;
  color: #444;
`

const ReviewName = styled.h3`
  color: var(--baby-blue);
  margin: 0.5rem 0;
`

interface ReviewsProps {
  reviews: Review[]
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <ReviewsGrid>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <ReviewImage src={review.image} alt={review.name} />
          <ReviewName>{review.name}</ReviewName>
          <StarRating>
            {[...Array(review.rating)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </StarRating>
          <ReviewComment>{review.comment}</ReviewComment>
          <ReviewDate>{review.date}</ReviewDate>
        </ReviewCard>
      ))}
    </ReviewsGrid>
  )
} 