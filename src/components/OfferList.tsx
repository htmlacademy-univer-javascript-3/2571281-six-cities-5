import OfferCard from './OfferCard';
import { Offer } from '../types';

type OfferListProps = {
  offers: Offer[];
  onFavoriteToggle?: (offerId: string, isCurrentlyFavorite: boolean) => void;
  onOfferHover?: (offerId: string | null) => void;
};

function OfferList({ offers, onFavoriteToggle, onOfferHover }: OfferListProps) {
  const handleMouseEnter = (id: string) => {
    if (onOfferHover) {
      onOfferHover(id);
    }
  };

  const handleMouseLeave = () => {
    if (onOfferHover) {
      onOfferHover(null);
    }
  };

  return (
    <div className="places__list cities__places-list">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        >
          <OfferCard
            offer={offer}
            onFavoriteToggle={onFavoriteToggle}
          />
        </div>
      ))}
    </div>
  );
}

export default OfferList;
