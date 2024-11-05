import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

function PrivateRoute({ children, isAuthenticated }: PrivateRouteProps) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
