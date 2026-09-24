import { motion } from 'framer-motion'
import { resume } from '../data/resume'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line px-4 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:py-12 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heliotrope/50 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 text-left sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold text-fg">
            {resume.name}
          </p>
          <p className="mt-1 text-xs text-muted">
            © {year} · Frontend · Full-Stack · Website Developer
          </p>
        </div>
        <p className="text-xs text-muted">
          Built with React · Vite · Tailwind · Framer Motion
        </p>
        <motion.a
          href="#top"
          whileHover={{ y: -2 }}
          className="inline-flex min-h-11 items-center rounded-full border border-heliotrope/40 bg-heliotrope/10 px-4 py-2 text-xs font-semibold text-heliotrope transition hover:bg-heliotrope hover:text-void"
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
