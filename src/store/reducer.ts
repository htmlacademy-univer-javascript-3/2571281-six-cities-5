import { Offer } from '../types';
import { Actions } from './action';

export type State = {
  city: string;
  offers: Offer[];
  currentOffer: Offer | null;
  isLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  isLoading: false,
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
    default:
      return state;
  }
}

export { reducer, initialState };
