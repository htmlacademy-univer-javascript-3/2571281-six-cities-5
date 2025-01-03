
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { toggleFavorite } from '../store/api-actions';
import { Offer } from '../types';

type OfferCardProps = {
  offer: Offer;
  onFavoriteToggle?: (offerId: string, isCurrentlyFavorite: boolean) => void;
};

function OfferCard({ offer, onFavoriteToggle }: OfferCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  const handleBookmarkClick = () => {
    if (authorizationStatus !== 'AUTH') {
      navigate('/login');
      return;
    }
    if (onFavoriteToggle) {
      onFavoriteToggle(offer.id, offer.isFavorite);
    } else {
      dispatch(toggleFavorite(offer.id, offer.isFavorite));
    }
  };

  const starCount = Math.round(offer.rating);
  const starWidth = starCount * 20;

  return (
    <article className="cities__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${starWidth}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
