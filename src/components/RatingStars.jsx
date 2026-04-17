import { Star } from 'lucide-react';

export default function RatingStars({ value = 4 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">4.8/5</span>
    </div>
  );
}
