import { ArrowRight, BadgePercent, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';

const highlights = [
  {
    icon: Truck,
    title: 'Fast delivery',
    copy: 'Priority shipping on every high-intent order simulation.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure checkout',
    copy: 'A trustworthy, polished flow designed to feel production ready.',
  },
  {
    icon: Sparkles,
    title: 'Curated picks',
    copy: 'Hand-selected trending finds across electronics, clothing, and accessories.',
  },
];

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const trending = products.filter((product) => product.trending).slice(0, 4);
  const hasProducts = products.length > 0;

  return (
    <div className="container-shell space-y-14">
      <section className="relative overflow-hidden rounded-[40px] border border-white/60 bg-hero-grid px-6 py-10 shadow-float dark:border-white/10 dark:bg-dark-hero md:px-10 md:py-14">
        <div className="absolute -right-12 top-10 h-36 w-36 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-700 backdrop-blur dark:border-brand-500/30 dark:bg-white/10 dark:text-brand-200">
              <BadgePercent size={16} />
              Flash offer: Save up to 30% this week
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Welcome to <span className="text-gradient">Cartify</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Shop Smarter with Cartify. Discover a premium storefront experience built around
              focused discovery, fluid motion, and modern convenience.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/shop">
                <Button variant="accent">
                  Shop collection
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="secondary">Browse wishlist</Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-white/60 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <item.icon className="text-brand-500" size={22} />
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-float rounded-[36px] border border-white/60 bg-white/80 p-6 shadow-glow backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-brand-600 p-7 text-white">
              <p className="text-sm uppercase tracking-[0.32em] text-white/70">Promotional Banner</p>
              <h2 className="mt-4 font-display text-3xl font-bold">
                Everyday essentials, elevated.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Shop standout gear, clean silhouettes, and smart accessories with a startup-grade
                shopping flow.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-bold">12+</p>
                  <p className="mt-1 text-sm text-white/80">Curated products</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-white/80">Shopping vibe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">
              Featured
            </p>
            <h2 className="section-title mt-2">Best of Cartify</h2>
          </div>
          <Link to="/shop">
            <Button variant="secondary">See full catalog</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {hasProducts
            ? featured.map((item) => <ProductCard key={item.id} product={item} />)
            : Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">
            Trending
          </p>
          <h2 className="section-title mt-2">What shoppers are loving right now</h2>
          <p className="section-copy mt-3 max-w-2xl">
            A fast-moving mix of statement tech, sharp daily wear, and polished accessories.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {hasProducts
            ? trending.map((item) => <ProductCard key={item.id} product={item} />)
            : Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div id="about" className="glass-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-500">About</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Cartify is built for smart, stylish shopping.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            This frontend-only store showcases real-world eCommerce interactions with thoughtful
            UX, responsive layouts, and a polished brand system.
          </p>
        </div>
        <div id="contact" className="glass-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-500">Contact</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Need help choosing a product?
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Reach the Cartify team anytime at support@cartify.store for product guidance and order
            assistance.
          </p>
        </div>
        <div id="privacy" className="glass-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-500">Privacy</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Your data stays local.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Cartify stores products, cart items, wishlist entries, and order history only in your
            browser using localStorage.
          </p>
        </div>
      </section>
    </div>
  );
}
