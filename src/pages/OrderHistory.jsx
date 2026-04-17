import EmptyState from '../components/EmptyState';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/format';

export default function OrderHistory() {
  const { orders, user } = useStore();
  const userOrders = orders.filter((order) => order.user?.email === user?.email);

  if (!userOrders.length) {
    return (
      <div className="container-shell">
        <EmptyState
          copy="Placed orders will appear here once you complete the Cartify checkout flow."
          title="No orders yet"
        />
      </div>
    );
  }

  return (
    <div className="container-shell space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">
          Order History
        </p>
        <h1 className="section-title mt-2">Past orders for {user?.name}</h1>
      </section>

      <section className="space-y-6">
        {userOrders.map((order) => (
          <article key={order.id} className="glass-card p-6 md:p-8">
            <div className="flex flex-col gap-4 border-b border-dashed border-slate-200 pb-6 dark:border-slate-700 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-500">
                  {order.id}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Delivered successfully
                </h2>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                <p>{formatDate(order.createdAt)}</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-[24px] bg-slate-50 px-4 py-3 dark:bg-slate-900"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(item.lineTotal)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Shipping details
                </p>
                <p className="mt-3 font-semibold text-slate-900 dark:text-white">
                  {order.customer.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {order.customer.address}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {order.customer.phone}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
