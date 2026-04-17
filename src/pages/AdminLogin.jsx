import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useStore } from '../context/StoreContext';

export default function AdminLogin() {
  const { loginAdmin } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/admin-dashboard';

  function handleSubmit(event) {
    event.preventDefault();

    if (loginAdmin(password)) {
      navigate(redirectPath, { replace: true });
    }
  }

  return (
    <div className="container-shell">
      <div className="mx-auto max-w-xl glass-card p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Admin</p>
        <h1 className="section-title mt-2">Cartify Admin Panel</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Enter the admin password to manage products for the storefront.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <FormInput
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            required
            type="password"
            value={password}
          />
          <Button className="w-full" type="submit" variant="accent">
            Access dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
