export default function FormInput({
  as = 'input',
  className = '',
  label,
  options = [],
  ...props
}) {
  const Component = as;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </span>
      ) : null}
      <Component
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      >
        {as === 'select'
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : null}
      </Component>
    </label>
  );
}
