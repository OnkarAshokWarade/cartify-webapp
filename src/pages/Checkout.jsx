import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, placeOrder, user } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    address: '',
    phone: '',
  });
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!cartItems.length && !placedOrder) {
    return (
      <div className="container-shell">
        <EmptyState
          actionHref="/cart"
          actionLabel="Return to cart"
          copy="You need items in your cart before you can place an order."
          title="Nothing to checkout"
        />
      </div>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      return;
    }

    const order = placeOrder(formData);
    setPlacedOrder(order);
  }

  if (placedOrder) {
    return (
      <div className="container-shell">
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">
            Success
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-slate-900 dark:text-white">
            Order placed successfully
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Your Cartify order <span className="font-semibold">{placedOrder.id}</span> is confirmed.
          </p>
          <div className="mt-8 grid gap-4 rounded-[28px] bg-slate-50 p-6 text-left dark:bg-slate-900 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Customer</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                {placedOrder.customer.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                {formatCurrency(placedOrder.total)}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/order-history">
              <Button variant="accent">View order history</Button>
            </Link>
            <Button variant="secondary" onClick={() => navigate('/shop')}>
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
      <form className="glass-card p-6 md:p-8" onSubmit={handleSubmit}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Checkout</p>
        <h1 className="section-title mt-2">Complete your order</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          This is a frontend-only checkout simulation. No payment will be processed.
        </p>

        <div className="mt-8 grid gap-5">
          <FormInput
            label="Full name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            required
            value={formData.name}
          />
          <FormInput
            as="textarea"
            className="min-h-[120px] resize-none"
            label="Address"
            name="address"
            onChange={handleChange}
            placeholder="Street, city, pin code"
            required
            value={formData.address}
          />
          <FormInput
            label="Phone number"
            name="phone"
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="10-digit number"
            required
            value={formData.phone}
          />
        </div>

        <Button className="mt-8" type="submit" variant="accent">
          Place order
        </Button>
      </form>

      <aside className="glass-card h-fit p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">
          Order Summary
        </p>
        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
              <img alt={item.name} className="h-16 w-16 rounded-2xl object-cover" src={item.image} />
              <div className="flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white">{item.name}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Qty {item.quantity}</p>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {formatCurrency(item.lineTotal)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4 border-t border-dashed border-slate-200 pt-6 text-sm dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold text-slate-900 dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
