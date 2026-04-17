import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useStore } from '../context/StoreContext';

export default function UserLogin() {
  const { loginUser, user } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
  });

  const redirectPath = location.state?.from?.pathname || '/shop';

  function handleSubmit(event) {
    event.preventDefault();
    loginUser(formData);
    navigate(redirectPath, { replace: true });
  }

  return (
    <div className="container-shell">
      <div className="mx-auto max-w-xl glass-card p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">User Login</p>
        <h1 className="section-title mt-2">Sign in to Cartify</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Log in to unlock checkout and keep your order history linked to your profile.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            name="name"
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            placeholder="Enter your name"
            required
            value={formData.name}
          />
          <FormInput
            label="Email"
            name="email"
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            placeholder="Enter your email"
            required
            type="email"
            value={formData.email}
          />
          <Button className="w-full" type="submit" variant="accent">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
