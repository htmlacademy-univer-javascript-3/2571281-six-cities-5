import { Offer } from '../types';

export const setCity = (city: string) => ({
  type: 'setCity' as const,
  payload: city,
});

export const setOffers = (offers: Offer[]) => ({
  type: 'setOffers' as const,
  payload: offers,
});

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>;
