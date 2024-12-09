import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { store } from './store';
import { setAuthorizationStatus, setUser } from './store/action';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(setAuthorizationStatus('NO_AUTH'));
        store.dispatch(setUser(null));
      }
      return Promise.reject(error);
    }
  );

  return api;
};
