import { Offer } from '../types';

export const setCity = (city: string) => ({
  type: 'setCity' as const,
  payload: city,
});

export const setOffers = (offers: Offer[]) => ({
  type: 'setOffers' as const,
  payload: offers,
});

export const setCurrentOffer = (offer: Offer | null) => ({
  type: 'setCurrentOffer' as const,
  payload: offer,
});

export const setLoading = (isLoading: boolean) => ({
  type: 'setLoading' as const,
  payload: isLoading,
});

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setCurrentOffer>
  | ReturnType<typeof setLoading>;
