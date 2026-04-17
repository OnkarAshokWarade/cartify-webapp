export default function SkeletonCard() {
  return (
    <div className="animate-pulse-soft overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-float dark:border-white/10 dark:bg-slate-900/70">
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-4 p-5">
        <div className="h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-4/5 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
