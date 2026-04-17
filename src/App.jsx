import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import ToastContainer from './components/ToastContainer';
import AdminRoute from './components/routes/AdminRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import OrderHistory from './pages/OrderHistory';
import ProductDetails from './pages/ProductDetails';
import Shop from './pages/Shop';
import UserLogin from './pages/UserLogin';
import Wishlist from './pages/Wishlist';
import { useStore } from './context/StoreContext';

function AppShell() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60 dark:opacity-20" />
      <ScrollToTop />
      <Navbar />
      <main className="pb-12 pt-24 sm:pt-28">
        <PageTransition routeKey={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  const { isReady } = useStore();

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
          <p className="font-semibold text-slate-600 dark:text-slate-300">Loading Cartify...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
