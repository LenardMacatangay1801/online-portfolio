import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'
import { SoonButton } from './SoonButton'

type Channel = {
  label: string
  value: string | null
  href?: string | null
  hint: string
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  const channels: Channel[] = [
    {
      label: 'Email',
      value: resume.email,
      href: `mailto:${resume.email}`,
      hint: 'Primary — usually fastest',
    },
    {
      label: 'Phone',
      value: resume.phone,
      href: resume.phone ? `tel:${resume.phone}` : null,
      hint: 'To be added soon',
    },
    {
      label: 'LinkedIn',
      value: resume.linkedin,
      href: resume.linkedin,
      hint: 'To be added soon',
    },
    {
      label: 'GitHub',
      value: resume.github,
      href: resume.github,
      hint: 'To be added soon',
    },
  ]

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(resume.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        title="Contact"
        subtitle="Let’s build something sharp together."
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-heliotrope/40 bg-gradient-to-br from-heliotrope/20 via-panel to-panel p-7 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="cyber-grid absolute inset-0 opacity-35" />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-heliotrope/25 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-wide text-heliotrope">
              Primary channel
            </p>
            <a
              href={`mailto:${resume.email}`}
              className="mt-3 block font-display text-lg font-semibold tracking-tight break-all text-fg transition hover:text-heliotrope sm:text-2xl lg:text-3xl"
            >
              {resume.email}
            </a>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
              Open to internships, junior frontend / full-stack roles, and
              collaborative web projects.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${resume.email}?subject=Hello%20Lenard`}
                className="btn-base btn-primary w-full sm:w-auto"
              >
                Send email
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="btn-base btn-secondary relative w-full sm:w-auto"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </motion.span>
                </AnimatePresence>
              </button>
              <SoonButton className="w-full sm:w-auto">
                Resume PDF — coming soon
              </SoonButton>
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:hidden">
              {channels
                .filter((channel) => channel.label !== 'Email')
                .map((channel) => (
                  <li
                    key={channel.label}
                    className="inline-flex items-center gap-2 text-sm text-mist"
                  >
                    <span className="soon-pulse" aria-hidden />
                    {channel.label}
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>

        <div className="hidden gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-1">
          {channels.map((channel, i) => {
            const ready = Boolean(channel.value)
            const inner = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-heliotrope">
                    {channel.label}
                  </p>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      ready
                        ? 'accent-shadow-10 animate-pulse bg-heliotrope'
                        : 'bg-muted/50'
                    }`}
                  />
                </div>
                {ready ? (
                  <p className="mt-2 text-sm font-medium break-all text-fg">
                    {channel.value}
                  </p>
                ) : (
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-mist">
                    <span className="soon-pulse" aria-hidden />
                    {channel.hint}
                  </p>
                )}
                {ready ? (
                  <p className="mt-2 text-xs text-muted">{channel.hint}</p>
                ) : null}
              </>
            )

            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {ready && channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      channel.href.startsWith('http') ? 'noreferrer' : undefined
                    }
                    className="block rounded-2xl border border-line bg-panel/90 p-5 transition hover:border-heliotrope/50 hover:accent-shadow-lift"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="demo-slot rounded-2xl border bg-panel/60 p-5">
                    {inner}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
