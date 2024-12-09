import { Offer, User } from '../types';
import { Actions } from './action';

export type State = {
  city: string;
  offers: Offer[];
  currentOffer: Offer | null;
  isLoading: boolean;
  authorizationStatus: string;
  user: User | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  isLoading: false,
  authorizationStatus: 'UNKNOWN',
  user: null,
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
    default:
      return state;
  }
}

export { reducer, initialState };
