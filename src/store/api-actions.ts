import { Dispatch } from 'redux';
import { setOffers, setCurrentOffer } from './action';
import { State } from './reducer';
import { Offer } from '../types';
import { AxiosInstance } from 'axios';

export const fetchOffers = () => async (
  dispatch: Dispatch,
  _getState: () => State,
  api: AxiosInstance
) => {
  const { data } = await api.get<Offer[]>('/offers');
  dispatch(setOffers(data));
};

export const fetchOfferById = (offerId: string) => async (
  dispatch: Dispatch,
  _getState: () => State,
  api: AxiosInstance
) => {
  dispatch(setCurrentOffer(null));
  const { data } = await api.get<Offer>(`/offers/${offerId}`);
  dispatch(setCurrentOffer(data));
};
