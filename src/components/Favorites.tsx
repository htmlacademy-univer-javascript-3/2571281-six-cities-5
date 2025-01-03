import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchFavorites } from '../store/api-actions';
import OfferCard from './OfferCard';
import Header from './Header';
import { Offer } from '../types';

function groupOffersByCity(offers: Offer[]) {
  return offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});
}

function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const groupedFavorites = groupOffersByCity(favorites);
  const cityNames = Object.keys(groupedFavorites);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {cityNames.length === 0 && <p>Nothing yet saved.</p>}
            {cityNames.map((city) => (
              <div key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <div className="locations__item-link">
                      <span>{city}</span>
                    </div>
                  </div>
                </div>
                <ul className="favorites__list">
                  {groupedFavorites[city].map((offer) => (
                    <li key={offer.id} className="favorites__locations-items">
                      <div className="favorites__places">
                        <OfferCard offer={offer} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
