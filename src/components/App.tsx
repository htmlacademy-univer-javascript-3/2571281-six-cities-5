import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Main';
import LoginPage from './Login';
import FavoritesPage from './Favorites';
import OfferPage from './Offer';
import Page404 from './404';
import PrivateRoute from './PrivateRoute';

function App({ numberOfOffers }: { numberOfOffers: number }) {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage numberOfOffers={numberOfOffers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FavoritesPage />
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
