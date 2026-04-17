import { Search, SlidersHorizontal } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
];

export default function Shop() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(250);
  const [isLoading, setIsLoading] = useState(true);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    setMaxPrice(Math.max(...products.map((product) => product.price)));
  }, [products]);

  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const highestPrice = products.length ? Math.max(...products.map((product) => product.price)) : 250;

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(deferredSearchTerm.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((first, second) => {
      if (sortBy === 'low-high') {
        return first.price - second.price;
      }

      if (sortBy === 'high-low') {
        return second.price - first.price;
      }

      if (first.featured === second.featured) {
        return Number(second.trending) - Number(first.trending);
      }

      return Number(second.featured) - Number(first.featured);
    });

  return (
    <div className="container-shell space-y-10">
      <section className="glass-card overflow-hidden p-8 md:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Shop</p>
            <h1 className="section-title mt-2">Discover your next favorite find</h1>
            <p className="section-copy mt-3 max-w-2xl">
              Search across curated categories, adjust your price range, and sort the collection in
              just a few clicks.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
            <SlidersHorizontal size={16} />
            {filteredProducts.length} products available
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products..."
              value={searchTerm}
            />
          </label>

          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            onChange={(event) => setSortBy(event.target.value)}
            value={sortBy}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Max price</span>
              <span>{formatCurrency(maxPrice)}</span>
            </div>
            <input
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-500 dark:bg-slate-700"
              max={highestPrice}
              min="30"
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              type="range"
              value={maxPrice}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </section>

      {!isLoading && !filteredProducts.length ? (
        <div className="glass-card p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            No products match your filters
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Try broadening your search or resetting the category and price filters.
          </p>
        </div>
      ) : null}
    </div>
  );
}
