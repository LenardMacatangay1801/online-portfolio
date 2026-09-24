import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'

const interests = [
  'Frontend frameworks',
  'Full-stack development',
  'Modern web stacks',
  'UI polish & interaction',
]

const emptyCertSlots = [
  { title: 'Certificate slot 01', note: 'To be added soon' },
  { title: 'Certificate slot 02', note: 'To be added soon' },
]

export function Certifications() {
  const hasCerts = resume.certifications.length > 0

  return (
    <Section id="certifications">
      <SectionHeading
        title="Certifications & Additional"
        subtitle="Credentials and extras that round out the profile."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Certifications column spans 2 */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-line bg-panel/90 p-6 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 right-0 h-40 w-40 rounded-full bg-heliotrope/10 blur-3xl"
          />
          <h3 className="font-display text-lg font-semibold text-fg">
            Certifications
          </h3>
          <p className="mt-1 text-sm text-muted">
            Verified credentials will live here once earned.
          </p>

          {hasCerts ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {resume.certifications.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i }}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-heliotrope/30 bg-heliotrope/5 p-4"
                >
                  <p className="text-xs font-medium text-heliotrope">Certified</p>
                  <p className="mt-1 font-medium text-fg">{c}</p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {emptyCertSlots.map((slot, i) => (
                <motion.li
                  key={slot.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i }}
                  whileHover={{ y: -3 }}
                  className="demo-slot rounded-xl border bg-void/25 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-heliotrope/25 bg-heliotrope/10 text-heliotrope">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-fg">
                    {slot.title}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-xs text-mist">
                    <span className="soon-pulse" aria-hidden />
                    {slot.note}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Side cards */}
        <div className="flex flex-col gap-5">
          <motion.div
            className="rounded-2xl border border-line bg-panel/90 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="font-display text-lg font-semibold text-fg">
              Languages
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {resume.languages?.join(' · ') ?? (
                <span className="inline-flex items-center gap-2">
                  <span className="soon-pulse" aria-hidden />
                  Language list to be added soon.
                </span>
              )}
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-line bg-panel/90 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="font-display text-lg font-semibold text-fg">
              Based in
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              {resume.location}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-1 flex-col rounded-2xl border border-heliotrope/30 bg-gradient-to-br from-heliotrope/10 to-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <h3 className="font-display text-lg font-semibold text-fg">
              Interests
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-void/40 px-3 py-1.5 text-xs font-medium text-mist ring-1 ring-heliotrope/20"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
