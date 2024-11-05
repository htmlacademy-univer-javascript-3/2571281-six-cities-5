import { useState } from 'react';
import OfferCard from './OfferCard';
import { Offer } from '../types';

interface OfferListProps {
  offers: Offer[];
}

function OfferList({ offers }: OfferListProps) {
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  const handleMouseEnter = (offerId: number) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className='cities__places-list places__list tabs__content'>
      {offers.map((offer) => (
        <div
          key={offer.title}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <OfferCard offer={offer} />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
