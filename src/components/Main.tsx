import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useState } from 'react';
import CitiesList from './CitiesList';
import OfferList from './OfferList';
import Map from './Map';
import SortingOptions from './SortingOptions';
import Spinner from '../spinner/Spinner';
import Header from './Header';

type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

function MainPage() {
  const currentCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const [sortOption, setSortOption] = useState<SortingOption>('Popular');
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const cityCoordinates: Record<string, [number, number]> = {
    Paris: [48.85661, 2.351499],
    Cologne: [50.938361, 6.959974],
    Brussels: [50.846557, 4.351697],
    Amsterdam: [52.37403, 4.88969],
    Hamburg: [53.550341, 10.000654],
    Dusseldorf: [51.225402, 6.776314],
  };

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
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {currentCity}
              </b>
              <SortingOptions currentSort={sortOption} onSortChange={setSortOption} />
              <OfferList offers={sortedOffers} onOfferHover={setHoveredOfferId} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={sortedOffers}
                  hoveredOfferId={hoveredOfferId || undefined}
                  centerCoordinates={cityCoordinates[currentCity]}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
