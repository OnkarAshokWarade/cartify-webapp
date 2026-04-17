import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';
import Button from './Button';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isSaved = wishlist.includes(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/90 shadow-float transition duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-slate-900/80">
      <div className="relative overflow-hidden">
        <img
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
          src={product.image}
        />
        <button
          className={`absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl transition ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-900 hover:bg-white dark:bg-slate-900/80 dark:text-white'
          }`}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/70 to-transparent px-4 py-4 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            {product.category}
          </span>
          <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button className="w-full" variant="secondary">
              <Eye size={16} />
              View
            </Button>
          </Link>
          <Button className="flex-1" variant="accent" onClick={() => addToCart(product.id)}>
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
