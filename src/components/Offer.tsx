import { Link, useParams } from 'react-router-dom';
import { Offer } from '../types';

interface OfferPageProps {
  offers: Offer[];
}

function OfferPage({ offers }: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find((off) => off.id === Number(id));

  if (!offer) {
    return <p>Offer not found</p>;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.imageUrls.map((url) => (
                <div key={url} className="offer__image-wrapper">
                  <img className="offer__image" src={url} alt="Offer image" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{(offer.rating / 20).toFixed(1)}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">3 Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max 4 adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.features.map((feature) => (
                    <li key={feature} className="offer__inside-item">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.hostAvatar}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.hostName}</span>
                  <span className="offer__user-status">{offer.hostStatus}</span>
                </div>
                <div className="offer__description">
                  {offer.description.map((paragraph) => (
                    <p key={paragraph} className="offer__text">{paragraph}</p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{offer.reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {offer.reviews.map((review) => (
                    <li key={review.date} className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="reviews__avatar user__avatar"
                            src={review.userAvatar}
                            width="54"
                            height="54"
                            alt="Review avatar"
                          />
                        </div>
                        <span className="reviews__user-name">{review.userName}</span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: `${review.rating}%` }}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">{review.text}</p>
                        <time className="reviews__time" dateTime={review.date}>
                          {new Date(review.date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offers
                .filter((nearbyOffer) => nearbyOffer.id !== offer.id)
                .slice(0, 3)
                .map((nearbyOffer) => (
                  <article key={nearbyOffer.id} className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <Link to={`/offer/${nearbyOffer.id}`}>
                        <img
                          className="place-card__image"
                          src={nearbyOffer.imageUrl}
                          width="260"
                          height="200"
                          alt="Nearby place image"
                        />
                      </Link>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">€{nearbyOffer.price}</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: `${nearbyOffer.rating}%` }}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={`/offer/${nearbyOffer.id}`}>{nearbyOffer.title}</Link>
                      </h2>
                      <p className="place-card__type">{nearbyOffer.type}</p>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
