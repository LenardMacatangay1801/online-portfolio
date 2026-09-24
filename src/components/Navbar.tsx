import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resume } from '../data/resume'
import { SoonButton } from './SoonButton'
import { ThemePicker } from './ThemePicker'

const links = [
  { href: '#summary', id: 'summary', label: 'Summary' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#education', id: 'education', label: 'Education' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#certifications', id: 'certifications', label: 'Certifications' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('summary')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const sectionIds = links.map((l) => l.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-void/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-8 lg:px-12">
        <ul className="hidden min-w-0 items-center gap-0.5 xl:flex">
          {links.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={[
                    'relative inline-block whitespace-nowrap rounded-md px-2 py-2 text-sm font-semibold tracking-tight',
                    'origin-center transition-colors duration-200 ease-out',
                    isActive ? 'text-heliotrope' : 'text-muted hover:text-heliotrope',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setActiveId(link.id)}
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    {link.label}
                  </motion.span>
                </a>
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="accent-shadow-12 absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-heliotrope"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </li>
            )
          })}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemePicker />
          <div className="hidden items-center gap-2 xl:flex">
            <a
              href={`mailto:${resume.email}`}
              className="inline-block origin-center rounded-md px-2.5 py-2 text-sm font-semibold tracking-tight text-heliotrope transition-all duration-200 ease-out hover:scale-110 hover:text-fg"
            >
              Email
            </a>
            <SoonButton compact>PDF — soon</SoonButton>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-line text-heliotrope xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition ${open ? 'translate-y-[7px] rotate-45' : ''}`}
              />
              <span className={`h-px w-full bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span
                className={`h-px w-full bg-current transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl xl:hidden"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex h-full flex-col items-center justify-center gap-2 px-6 pb-10">
              {links.map((link, i) => {
                const isActive = activeId === link.id
                return (
                  <motion.li
                    key={link.href}
                    className="w-full max-w-xs"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      className={`flex min-h-12 items-center justify-center rounded-xl px-4 font-display text-xl font-semibold tracking-tight transition ${
                        isActive
                          ? 'bg-heliotrope/15 text-heliotrope'
                          : 'text-fg hover:bg-fg/5'
                      }`}
                      onClick={() => {
                        setActiveId(link.id)
                        setOpen(false)
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                )
              })}
              <li className="mt-4 flex w-full max-w-xs flex-col gap-3">
                <a
                  href={`mailto:${resume.email}`}
                  className="btn-base btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  Email me
                </a>
                <SoonButton className="w-full">PDF — soon</SoonButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
