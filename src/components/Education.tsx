import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'

const focusIcons: Record<string, string> = {
  'Web development': 'W',
  Programming: 'P',
  Databases: 'D',
  'Full-stack application fundamentals': 'F',
}

export function Education() {
  const { education } = resume
  const yearProgress = 75 // 4th year of a 4-year program

  return (
    <Section id="education">
      <SectionHeading
        title="Education"
        subtitle="Academic foundation for frontend and full-stack work."
      />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-line bg-panel/90 p-6 sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-heliotrope/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-10 h-40 w-40 rounded-full bg-neon-cyan/10 blur-3xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-heliotrope/30 bg-heliotrope/10 px-3 py-1 text-xs font-semibold text-heliotrope">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-heliotrope opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-heliotrope" />
              </span>
              Currently enrolled
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-2 text-lg font-medium text-heliotrope">
              {education.school}
            </p>
            <p className="mt-1 text-muted">{education.location}</p>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-muted">Program progress</span>
                <span className="text-heliotrope">{education.yearLevel}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-panel-2 ring-1 ring-fg/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-heliotrope-dim to-heliotrope"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${yearProgress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-fg">Focus areas</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {education.focus.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-panel-2/80 px-3 py-2.5 transition hover:border-heliotrope/40"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-heliotrope/15 font-display text-xs font-bold text-heliotrope">
                      {focusIcons[item] ?? item.charAt(0)}
                    </span>
                    <span className="text-sm font-medium text-mist">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-heliotrope/35 bg-gradient-to-br from-heliotrope/15 to-transparent p-5"
            >
              <p className="text-xs font-medium text-muted">Year level</p>
              <p className="mt-2 font-display text-3xl font-semibold text-fg">
                {education.yearLevel}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-line bg-panel-2 p-5"
            >
              <p className="text-xs font-medium text-muted">Expected graduation</p>
              <p className="mt-2 font-display text-3xl font-semibold text-heliotrope">
                {education.expectedGraduation}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="demo-slot flex flex-1 flex-col justify-center rounded-2xl border bg-void/30 p-5"
            >
              <p className="inline-flex items-center gap-2 text-xs font-medium text-muted">
                <span className="soon-pulse" aria-hidden />
                Capstone / thesis
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {education.capstone ??
                  'Topic and details to be added soon as the project finalizes.'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
