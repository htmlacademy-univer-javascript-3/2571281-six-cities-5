import { useSelector } from 'react-redux';
import { RootState } from '../store';
import OfferCard from './OfferCard';
import Header from './Header';

function FavoritesPage() {
  const offers = useSelector((state: RootState) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffers.length > 0 ? (
                favoriteOffers.map((offer) => (
                  <li key={offer.id} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{offer.city.name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferCard offer={offer} />
                    </div>
                  </li>
                ))
              ) : (
                <p>No saved listings.</p>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
