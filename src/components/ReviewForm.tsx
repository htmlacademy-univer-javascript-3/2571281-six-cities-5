import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { postComment } from '../store/api-actions';
import { useParams } from 'react-router-dom';

function ReviewForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (text: string, currentRating: number | null) => {
    const isReviewValid = text.length >= 50 && text.length <= 300;
    const isRatingValid = currentRating !== null;
    setIsSubmitDisabled(!(isReviewValid && isRatingValid));
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRating = parseInt(event.target.value, 10);
    setRating(selectedRating);
    validateForm(review, selectedRating);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setReview(text);
    validateForm(text, rating);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id || rating === null) {
      return;
    }
    setIsFormDisabled(true);
    setError('');
    try {
      await dispatch(postComment(id, { comment: review, rating }));
      setRating(null);
      setReview('');
      setIsSubmitDisabled(true);
    } catch {
      setError('Error. Please try again.');
    } finally {
      setIsFormDisabled(false);
    }
  };

  const getRatingTitle = (star: number) => {
    switch (star) {
      case 5:
        return 'perfect';
      case 4:
        return 'good';
      case 3:
        return 'not bad';
      case 2:
        return 'badly';
      case 1:
        return 'terribly';
      default:
        return '';
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
              disabled={isFormDisabled}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(star)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        disabled={isFormDisabled}
      />
      <div className="reviews__button-wrapper">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
