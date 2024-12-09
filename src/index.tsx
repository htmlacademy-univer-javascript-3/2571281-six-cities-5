import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffers, login } from './store/api-actions';
import App from './components/App';

store.dispatch(login());
store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
