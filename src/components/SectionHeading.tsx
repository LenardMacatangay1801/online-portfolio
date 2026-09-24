import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeBlur, viewOnce } from '../lib/motion'

type SectionHeadingProps = {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-10 max-w-2xl"
      variants={fadeBlur}
      initial="hidden"
      whileInView="show"
      viewport={viewOnce}
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-base leading-relaxed text-muted sm:mt-3 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-4 py-14 sm:scroll-mt-24 sm:px-8 sm:py-20 lg:px-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
