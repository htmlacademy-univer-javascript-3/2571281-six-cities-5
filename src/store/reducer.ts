import { Offer } from '../types';
import { Actions } from './action';

export type State = {
  city: string;
  offers: Offer[];
  currentOffer: Offer | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case 'setCity':
      return { ...state, city: action.payload };
    case 'setOffers':
      return { ...state, offers: action.payload };
    case 'setCurrentOffer':
      return { ...state, currentOffer: action.payload };
    default:
      return state;
  }
}

export { reducer, initialState };
