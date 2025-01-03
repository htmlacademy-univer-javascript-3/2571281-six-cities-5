import { Offer, User, Comment } from '../types';
import { Actions } from './action';

export type State = {
  city: string;
  offers: Offer[];
  currentOffer: Offer | null;
  isLoading: boolean;
  authorizationStatus: string;
  user: User | null;
  comments: Comment[];
  nearbyOffers: Offer[];
  favorites: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  isLoading: false,
  authorizationStatus: 'UNKNOWN',
  user: null,
  comments: [],
  nearbyOffers: [],
  favorites: []
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case 'setCity':
      return { ...state, city: action.payload };
    case 'setOffers':
      return { ...state, offers: action.payload, isLoading: false };
    case 'setCurrentOffer':
      return { ...state, currentOffer: action.payload };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    case 'setAuthorizationStatus':
      return { ...state, authorizationStatus: action.payload };
    case 'setUser':
      return { ...state, user: action.payload };
    case 'setComments':
      return { ...state, comments: action.payload, isLoading: false };
    case 'setNearbyOffers':
      return { ...state, nearbyOffers: action.payload, isLoading: false };
    case 'setFavorites':
      return { ...state, favorites: action.payload, isLoading: false };
    case 'updateOffer': {
      const updated = action.payload;
      const updatedOffers = state.offers.map((o) => (o.id === updated.id ? updated : o));
      const updatedFavorites = state.favorites.map((o) => (o.id === updated.id ? updated : o));
      const updatedCurrent = state.currentOffer?.id === updated.id ? updated : state.currentOffer;
      return {
        ...state,
        offers: updatedOffers,
        favorites: updatedFavorites,
        currentOffer: updatedCurrent
      };
    }
    default:
      return state;
  }
}

export { reducer, initialState };
