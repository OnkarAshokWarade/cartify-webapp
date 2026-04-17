import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow transition duration-300 group-hover:rotate-6">
        <ShoppingBag size={21} />
      </span>
      <span className="font-display text-2xl tracking-tight text-slate-950 dark:text-white">
        <span className="font-bold">Cart</span>
        <span className="font-medium text-slate-500 dark:text-slate-300">ify</span>
      </span>
    </Link>
  );
}
