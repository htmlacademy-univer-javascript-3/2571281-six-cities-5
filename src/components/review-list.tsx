import { Comment } from '../types';

type ReviewListProps = {
  reviews: Comment[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const limitedReviews = sortedReviews.slice(0, 10);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews <span className="reviews__amount">{limitedReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {limitedReviews.map((review) => {
          const dateObject = new Date(review.date);
          const formattedDate = dateObject.toLocaleString('en-US', { month: 'long', year: 'numeric' });
          const formattedDateAttribute = dateObject.toISOString().split('T')[0];
          const starWidth = `${review.rating * 20}%`;

          return (
            <li key={review.id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={review.user.avatarUrl}
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{review.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: starWidth }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{review.comment}</p>
                <time className="reviews__time" dateTime={formattedDateAttribute}>
                  {formattedDate}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ReviewList;
