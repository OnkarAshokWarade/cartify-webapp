import { Link } from 'react-router-dom';
import Button from './Button';

export default function EmptyState({ actionHref = '/shop', actionLabel = 'Explore shop', copy, title }) {
  return (
    <div className="glass-card mx-auto max-w-2xl p-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-2xl">
        ○
      </div>
      <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{copy}</p>
      <Link to={actionHref} className="mt-6 inline-flex">
        <Button variant="accent">{actionLabel}</Button>
      </Link>
    </div>
  );
}
