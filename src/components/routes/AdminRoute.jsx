import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminRoute({ children }) {
  const { admin } = useStore();
  const location = useLocation();

  if (!admin) {
    return <Navigate replace state={{ from: location }} to="/admin-login" />;
  }

  return children;
}
