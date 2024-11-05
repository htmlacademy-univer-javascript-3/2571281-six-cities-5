import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const numberOfOffers = 312; // Data defined here

root.render(
  <React.StrictMode>
    <App numberOfOffers={numberOfOffers} />
  </React.StrictMode>
);
