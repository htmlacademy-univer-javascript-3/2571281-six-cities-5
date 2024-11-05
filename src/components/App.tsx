import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Offer } from '../types';
import MainPage from './Main';
import LoginPage from './Login';
import FavoritesPage from './Favorites';
import OfferPage from './Offer';
import Page404 from './404';
import PrivateRoute from './PrivateRoute';

function App({ offers }: { offers: Offer[] }) {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
