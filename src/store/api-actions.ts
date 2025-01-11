import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';
import {
  setOffers,
  setCurrentOffer,
  setLoading,
  setAuthorizationStatus,
  setUser,
  setComments,
  setNearbyOffers,
  setFavorites,
} from './action';
import { Offer, User, Comment } from '../types';

export const fetchOffers = () => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  const { data } = await api.get<Offer[]>('/offers');
  dispatch(setOffers(data));
};

export const fetchOfferById = (offerId: string) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  const { data } = await api.get<Offer>(`/offers/${offerId}`);
  dispatch(setCurrentOffer(data));
  dispatch(setLoading(false));
};

export const fetchCommentsByOfferId = (offerId: string) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  const { data } = await api.get<Comment[]>(`/comments/${offerId}`);
  dispatch(setComments(data));
  dispatch(setLoading(false));
};

export const fetchNearbyOffers = (offerId: string) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  dispatch(setNearbyOffers(data));
  dispatch(setLoading(false));
};

export const login = () => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.get<User>('/login');
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus('AUTH'));
  } catch {
    dispatch(setAuthorizationStatus('NO_AUTH'));
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const authorize = (email: string, password: string) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.post<User>('/login', { email, password });
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus('AUTH'));
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['X-Token'] = data.token;
  } catch {
    dispatch(setAuthorizationStatus('NO_AUTH'));
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const initializeAuth = () => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['X-Token'] = token;
    try {
      const { data } = await api.get<User>('/login');
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus('AUTH'));
    } catch {
      localStorage.removeItem('token');
      dispatch(setAuthorizationStatus('NO_AUTH'));
    }
  } else {
    dispatch(setAuthorizationStatus('NO_AUTH'));
  }
};


export const postComment = (
  offerId: string,
  commentData: { comment: string; rating: number }
) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  try {
    await api.post(`/comments/${offerId}`, commentData);
    dispatch(fetchCommentsByOfferId(offerId));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  try {
    await api.delete('/logout');
  } finally {
    dispatch(setLoading(false));
    localStorage.removeItem('token');
    dispatch(setUser(null));
    dispatch(setAuthorizationStatus('NO_AUTH'));
    delete api.defaults.headers.common['X-Token'];
    dispatch(fetchOffers());
  }
};


export const fetchFavorites = () => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  dispatch(setLoading(true));
  try {
    const { data } = await api.get<Offer[]>('/favorite');
    dispatch(setFavorites(data));
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleFavorite = (offerId: string, isFavorite: boolean) => async (
  dispatch: AppDispatch,
  _getState: () => RootState,
  api: AxiosInstance
) => {
  try {
    const status = isFavorite ? 0 : 1;
    await api.post<Offer>(`/favorite/${offerId}/${status}`);
    dispatch(fetchOffers());
    dispatch(fetchFavorites());
  } finally {
    dispatch(setLoading(false));
  }
};

