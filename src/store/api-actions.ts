import { Dispatch } from 'redux';
import { setOffers } from './action';
import { Offer } from '../types';
import { AxiosInstance } from 'axios';

export const fetchOffers = () => async (
  dispatch: Dispatch,
  _getState: () => unknown,
  api: AxiosInstance
) => {
  const { data } = await api.get<Offer[]>('/six-cities/offers');
  dispatch(setOffers(data));
};
