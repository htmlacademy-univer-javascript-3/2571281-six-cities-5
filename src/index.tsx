import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffers, initializeAuth } from './store/api-actions';
import App from './App';

store.dispatch(initializeAuth());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
