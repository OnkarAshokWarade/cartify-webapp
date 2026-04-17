import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function ProtectedRoute({ children }) {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}
