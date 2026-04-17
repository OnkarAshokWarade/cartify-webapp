import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Store,
  SunMedium,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from './Button';
import Logo from './Logo';

function NavItem({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition ${
          isActive
            ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
            : 'text-slate-700 hover:bg-white hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { admin, cartCount, darkMode, logoutAdmin, logoutUser, toggleDarkMode, user, wishlist } =
    useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleUserAction() {
    if (user) {
      logoutUser();
    } else {
      navigate('/login');
    }

    setMobileOpen(false);
  }

  function handleAdminAction() {
    if (admin) {
      logoutAdmin();
    } else {
      navigate('/admin-login');
    }

    setMobileOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div
          className={`rounded-[28px] border px-4 py-3 transition-all duration-300 sm:px-6 ${
            isScrolled
              ? 'border-white/60 bg-white/85 shadow-float backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85'
              : 'border-transparent bg-white/70 backdrop-blur-md dark:bg-slate-950/60'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Logo />

            <nav className="hidden items-center gap-2 lg:flex">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/shop">Shop</NavItem>
              <NavItem to="/cart">Cart</NavItem>
              <NavItem to="/login">Login</NavItem>
              <NavItem to={admin ? '/admin-dashboard' : '/admin-login'}>Admin</NavItem>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <button
                className="relative rounded-full p-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={toggleDarkMode}
                type="button"
              >
                {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
              </button>
              <NavLink
                className="relative rounded-full p-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                to="/wishlist"
              >
                <Heart size={18} />
                {wishlist.length ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                ) : null}
              </NavLink>
              <NavLink
                className="relative rounded-full p-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                to="/cart"
              >
                <ShoppingCart size={18} />
                {cartCount ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </NavLink>
              {user ? (
                <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                    Welcome, {user.name}
                  </span>
                  <button onClick={handleUserAction} type="button">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Button className="px-4 py-2" variant="accent" onClick={handleUserAction}>
                  <LogIn size={16} />
                  Login
                </Button>
              )}
              {admin ? (
                <button
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  onClick={handleAdminAction}
                  type="button"
                >
                  Logout admin
                </button>
              ) : null}
            </div>

            <button
              className="rounded-full p-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setMobileOpen((current) => !current)}
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileOpen ? (
            <div className="mt-4 space-y-3 border-t border-slate-200/80 pt-4 dark:border-slate-800 lg:hidden">
              <div className="grid gap-2">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/shop">Shop</NavItem>
                <NavItem to="/cart">Cart</NavItem>
                <NavItem to="/wishlist">Wishlist</NavItem>
                <NavItem to="/order-history">Orders</NavItem>
                <NavItem to={admin ? '/admin-dashboard' : '/admin-login'}>
                  {admin ? 'Dashboard' : 'Admin'}
                </NavItem>
              </div>

              <div className="grid gap-3 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <button
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-left dark:bg-slate-800"
                  onClick={toggleDarkMode}
                  type="button"
                >
                  <span className="font-semibold">Theme</span>
                  {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
                </button>

                <button
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-left dark:bg-slate-800"
                  onClick={handleUserAction}
                  type="button"
                >
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <UserRound size={16} />
                    {user ? `Logout ${user.name}` : 'User login'}
                  </span>
                  {user ? <LogOut size={16} /> : <LogIn size={16} />}
                </button>

                <button
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-left dark:bg-slate-800"
                  onClick={handleAdminAction}
                  type="button"
                >
                  <span className="inline-flex items-center gap-2 font-semibold">
                    {admin ? <LayoutDashboard size={16} /> : <Store size={16} />}
                    {admin ? 'Logout admin' : 'Admin login'}
                  </span>
                  {admin ? <LogOut size={16} /> : <LogIn size={16} />}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
