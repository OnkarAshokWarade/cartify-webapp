export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 py-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
  <div className="container-shell flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
    <div>
      <p>© 2026 Cartify. All rights reserved.</p>
      <p className="mt-1 text-orange-500 dark:text-orange-400">Developed by OnkarWarade</p>
    </div>
    <div className="flex flex-wrap items-center gap-4">
      <a className="transition hover:text-orange-500" href="/#about">
        About
      </a>
      <a className="transition hover:text-orange-500" href="/#contact">
        Contact
      </a>
      <a className="transition hover:text-orange-500" href="/#privacy">
        Privacy Policy
      </a>
    </div>
  </div>
</footer>
  );
}
