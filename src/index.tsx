import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { setOffers } from './store/action';
import App from './components/App';
import offers from './mocks/offers';

store.dispatch(setOffers(offers));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App offers={offers} />
  </Provider>
);
