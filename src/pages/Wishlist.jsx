import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlistItems } = useStore();

  if (!wishlistItems.length) {
    return (
      <div className="container-shell">
        <EmptyState
          copy="Save products to your wishlist so they stay handy while you browse."
          title="Your wishlist is empty"
        />
      </div>
    );
  }

  return (
    <div className="container-shell space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Wishlist</p>
        <h1 className="section-title mt-2">Saved for later</h1>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
