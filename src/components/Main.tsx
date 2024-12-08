import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import CitiesList from './CitiesList';
import OfferList from './OfferList';
import Map from './Map';
import SortingOptions from './SortingOptions';
import Spinner from '../spinner/Spinner';

type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

function MainPage() {
  const currentCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const isLoading = useSelector((state: RootState) => state.isLoading);

  const [sortOption, setSortOption] = useState<SortingOption>('Popular');
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  if (isLoading) {
    return <Spinner />;
  }

  const filteredOffers = allOffers.filter((offer) => offer.city.name === currentCity);
  const sortedOffers = [...filteredOffers];

  switch (sortOption) {
    case 'Price: low to high':
      sortedOffers.sort((a, b) => a.price - b.price);
      break;
    case 'Price: high to low':
      sortedOffers.sort((a, b) => b.price - a.price);
      break;
    case 'Top rated first':
      sortedOffers.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return (
    <div className='page page--gray page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <a className='header__logo-link header__logo-link--active' href='/'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width='81'
                  height='41'
                />
              </a>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <a className='header__nav-link header__nav-link--profile' href='#'>
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>
                      Oliver.conner@gmail.com
                    </span>
                    <span className='header__favorite-count'>3</span>
                  </a>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <CitiesList cities={['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']} />
          </section>
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{sortedOffers.length} places to stay in {currentCity}</b>
              <SortingOptions currentSort={sortOption} onSortChange={setSortOption} />
              <OfferList offers={sortedOffers} onOfferHover={setHoveredOfferId} />
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map'>
                <Map offers={sortedOffers} hoveredOfferId={hoveredOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
