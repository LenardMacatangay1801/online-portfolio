import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { resume } from '../data/resume'
import { SoonButton } from './SoonButton'

function RotatingRole() {
  const roles = resume.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'type' | 'hold' | 'delete'>('type')
  const reduceMotion = useReducedMotion()

  const role = roles[roleIndex]

  useEffect(() => {
    if (reduceMotion) return

    let delay = 70
    if (phase === 'hold') delay = 1200
    if (phase === 'delete') delay = 34

    const id = window.setTimeout(() => {
      if (phase === 'type') {
        if (count < role.length) {
          setCount((current) => current + 1)
          return
        }
        setPhase('hold')
        return
      }

      if (phase === 'hold') {
        setPhase('delete')
        return
      }

      if (count > 0) {
        setCount((current) => current - 1)
        return
      }

      setPhase('type')
      setRoleIndex((current) => (current + 1) % roles.length)
    }, delay)

    return () => window.clearTimeout(id)
  }, [count, phase, reduceMotion, role, roles.length])

  const shown = reduceMotion ? role : role.slice(0, count)

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 font-display font-semibold tracking-tight">
      <span>I am a</span>
      <span className="role-cycle inline-flex items-center whitespace-nowrap font-mono font-bold tracking-normal text-heliotrope">
        {shown}
        {reduceMotion ? null : (
          <span className="typing-caret" aria-hidden />
        )}
      </span>
    </span>
  )
}

function PortraitFallback({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <div className="accent-shadow-photo relative z-10 flex h-[min(46vh,380px)] w-[min(78%,260px)] flex-col items-center justify-end overflow-hidden rounded-[1.75rem] border border-heliotrope/45 bg-gradient-to-b from-panel-2 via-panel to-void sm:h-[min(56vh,520px)] sm:w-[min(100%,320px)] lg:h-[min(68vh,560px)] lg:w-[340px]">
      <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-dashed border-heliotrope/30" />
      <div className="accent-shadow-36 mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-heliotrope/50 bg-heliotrope/15 font-display text-3xl font-semibold text-fg sm:h-28 sm:w-28 sm:text-4xl">
        {initials}
      </div>
      <div className="h-20 w-[72%] rounded-t-[999px] bg-heliotrope/15 sm:h-28" />
      <p className="absolute bottom-4 inline-flex items-center gap-2 text-[11px] font-medium text-mist">
        <span className="soon-pulse" aria-hidden />
        Photo — soon
      </p>
    </div>
  )
}

export function Hero() {
  const [photoReady, setPhotoReady] = useState(true)

  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top))] pb-12 sm:min-h-svh sm:pb-20 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="accent-wash absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_80%,rgba(92,225,255,0.06),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-6 lg:px-12">
        {/* Photo first on mobile for strong visual; text first on desktop */}
        <motion.div
          className="relative mx-auto flex w-full max-w-sm items-end justify-center order-1 lg:order-2 lg:max-w-none lg:justify-end"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-heliotrope/20 blur-3xl"
          />
          <div className="relative z-10 w-fit">
            {photoReady ? (
              <img
                src={resume.photo}
                alt={`${resume.name} — profile photo`}
                className="accent-drop max-h-[min(46vh,380px)] w-auto max-w-[min(100%,340px)] object-contain object-bottom select-none sm:max-h-[min(56vh,520px)] sm:max-w-full lg:max-h-[min(72vh,620px)]"
                draggable={false}
                onError={() => setPhotoReady(false)}
              />
            ) : (
              <PortraitFallback name={resume.name} />
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute top-3 left-1 h-7 w-7 border-t-2 border-l-2 border-heliotrope/80 sm:top-4 sm:left-2 sm:h-9 sm:w-9"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-3 right-1 h-7 w-7 border-t-2 border-r-2 border-heliotrope/80 sm:top-4 sm:right-2 sm:h-9 sm:w-9"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-void via-void/70 to-transparent sm:h-24"
          />
        </motion.div>

        <div className="relative z-20 order-2 lg:order-1">
          <motion.h1
            className="name-stroke font-display text-[2rem] leading-[1.1] font-bold tracking-tight text-heliotrope sm:text-5xl lg:text-[3.5rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {resume.name}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-base leading-snug font-medium text-mist sm:mt-5 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <span className="sr-only">
              I am a Frontend Developer, Full-Stack Developer, and Website Developer.
            </span>
            <span aria-hidden>
              <RotatingRole />
            </span>
          </motion.p>

          <motion.p
            className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-[1.05rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            4th-year BS IT student at the University of Batangas — building
            responsive interfaces and full-stack web apps with a neon edge.
          </motion.p>

          <motion.div
            className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
          >
            <motion.a
              href="#projects"
              className="btn-base btn-primary group w-full sm:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View projects
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </motion.a>
            <motion.a
              href={`mailto:${resume.email}`}
              className="btn-base btn-secondary w-full sm:w-auto"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact
            </motion.a>
            <SoonButton className="w-full sm:w-auto">
              Resume PDF — coming soon
            </SoonButton>
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-muted sm:mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-heliotrope">Open to work</span>
            <span className="mx-2 text-line">·</span>
            Expected graduation 2027
          </motion.p>
        </div>
      </div>
    </section>
  )
}
