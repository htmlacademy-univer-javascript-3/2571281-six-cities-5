import OfferCard from './OfferCard';
import { Offer } from '../types';

interface OfferListProps {
  offers: Offer[];
  onOfferHover?: (id: string | null) => void;
}

function OfferList({ offers, onOfferHover }: OfferListProps) {
  const handleMouseEnter = (offerId: string) => {
    if (onOfferHover) {
      onOfferHover(offerId);
    }
  };

  const handleMouseLeave = () => {
    if (onOfferHover) {
      onOfferHover(null);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
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
