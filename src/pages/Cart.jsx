import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateCartQuantity } = useStore();

  if (!cartItems.length) {
    return (
      <div className="container-shell">
        <EmptyState
          copy="Your cart is empty right now. Start adding products to experience the Cartify checkout flow."
          title="Your cart is waiting"
        />
      </div>
    );
  }

  return (
    <div className="container-shell grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <section className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Cart</p>
            <h1 className="section-title mt-2">Review your selections</h1>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-brand-500">
            Continue shopping
          </Link>
        </div>

        <div className="mt-8 space-y-5">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row"
            >
              <img
                alt={item.name}
                className="h-32 w-full rounded-[24px] object-cover sm:w-36"
                src={item.image}
              />
              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">
                    {item.category}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {formatCurrency(item.price)} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} type="button">
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} type="button">
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="min-w-24 text-right font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(item.lineTotal)}
                  </p>
                  <button
                    className="rounded-full p-3 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="glass-card h-fit p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">
          Summary
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
          Ready to checkout?
        </h2>
        <div className="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>
            <span>Free</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-slate-200 pt-6 text-lg font-bold text-slate-900 dark:border-slate-700 dark:text-white">
          <span>Total</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <Link className="mt-8 block" to="/checkout">
          <Button className="w-full" variant="accent">
            Proceed to checkout
          </Button>
        </Link>
      </aside>
    </div>
  );
}
