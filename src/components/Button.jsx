const variants = {
  primary:
    'bg-slate-950 text-white shadow-glow hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200',
  secondary:
    'bg-white text-slate-900 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800',
  accent:
    'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  danger:
    'bg-rose-500 text-white hover:-translate-y-0.5 hover:bg-rose-600',
};

export default function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
