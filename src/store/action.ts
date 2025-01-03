import { Offer, User, Comment } from '../types';

export const setCity = (city: string) => ({
  type: 'setCity' as const,
  payload: city
});

export const setOffers = (offers: Offer[]) => ({
  type: 'setOffers' as const,
  payload: offers
});

export const setCurrentOffer = (offer: Offer | null) => ({
  type: 'setCurrentOffer' as const,
  payload: offer
});

export const setLoading = (isLoading: boolean) => ({
  type: 'setLoading' as const,
  payload: isLoading
});

export const setAuthorizationStatus = (status: string) => ({
  type: 'setAuthorizationStatus' as const,
  payload: status
});

export const setUser = (user: User | null) => ({
  type: 'setUser' as const,
  payload: user
});

export const setComments = (comments: Comment[]) => ({
  type: 'setComments' as const,
  payload: comments
});

export const setNearbyOffers = (offers: Offer[]) => ({
  type: 'setNearbyOffers' as const,
  payload: offers
});

export const setFavorites = (offers: Offer[]) => ({
  type: 'setFavorites' as const,
  payload: offers
});

export const updateOffer = (offer: Offer) => ({
  type: 'updateOffer' as const,
  payload: offer
});

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setCurrentOffer>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUser>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setNearbyOffers>
  | ReturnType<typeof setFavorites>
  | ReturnType<typeof updateOffer>;
