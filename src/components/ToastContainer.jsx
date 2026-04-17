import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const iconMap = {
  error: AlertCircle,
  info: Info,
  success: CheckCircle2,
};

export default function ToastContainer() {
  const { toast } = useStore();

  if (!toast) {
    return null;
  }

  const Icon = iconMap[toast.type] ?? CheckCircle2;

  return (
    <div className="fixed right-4 top-24 z-[60] max-w-sm animate-page-in sm:right-6">
      <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-slate-950 px-4 py-3 text-white shadow-2xl dark:border-white/10 dark:bg-white dark:text-slate-950">
        <Icon size={18} />
        <p className="text-sm font-semibold">{toast.message}</p>
      </div>
    </div>
  );
}
