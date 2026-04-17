import { Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, products, toggleWishlist, wishlist } = useStore();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="container-shell">
        <EmptyState
          actionHref="/shop"
          actionLabel="Back to shop"
          copy="The product you requested is unavailable or may have been removed."
          title="Product not found"
        />
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container-shell space-y-10">
      <button
        className="text-sm font-semibold text-slate-500 transition hover:text-brand-500 dark:text-slate-300"
        onClick={() => navigate(-1)}
        type="button"
      >
        ← Back
      </button>

      <section className="glass-card overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="overflow-hidden rounded-[32px] bg-slate-100 dark:bg-slate-900">
            <img alt={product.name} className="h-full min-h-[420px] w-full object-cover" src={product.image} />
          </div>

          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
              {product.category}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold text-slate-950 dark:text-white">
              {product.name}
            </h1>
            <div className="mt-4">
              <RatingStars value={4} />
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-4xl font-bold text-slate-950 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              <span className="rounded-full bg-accent-500/10 px-3 py-1 text-sm font-semibold text-accent-600 dark:text-accent-400">
                Free shipping simulation
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button variant="accent" onClick={() => addToCart(product.id)}>
                <ShoppingCart size={18} />
                Add to cart
              </Button>
              <Button variant="secondary" onClick={() => toggleWishlist(product.id)}>
                <Heart
                  size={18}
                  fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                />
                Add to wishlist
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Materials</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">Premium finish</p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Returns</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">14-day policy</p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Support</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">Always online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">
                Similar picks
              </p>
              <h2 className="section-title mt-2">More from {product.category}</h2>
            </div>
            <Link to="/shop">
              <Button variant="secondary">View all</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
