import type { Review as ReviewType } from '../types';
import ReviewItem from './Review';

type ReviewListProps = {
  reviews: ReviewType[];
};

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.date} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewList;
