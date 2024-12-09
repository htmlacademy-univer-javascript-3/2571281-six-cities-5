import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  return authorizationStatus === 'AUTH' ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
