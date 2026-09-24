import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'

const seekingTags = [
  'Frontend Developer',
  'Full-Stack Developer',
  'Website Developer',
  'Internship',
  'Junior roles',
]

const timeline = [
  {
    label: 'Now',
    title: 'Building projects & skills',
    detail:
      'Shipping mini projects, sharpening React / full-stack fundamentals, and preparing for professional roles.',
    active: true,
  },
  {
    label: 'Next',
    title: 'Internship / junior role',
    detail: resume.experience.openTo + '.',
    active: false,
  },
  {
    label: 'Soon',
    title: 'Formal experience entries',
    detail: 'Role titles, companies, and impact bullets will appear here.',
    active: false,
  },
]

export function Experience() {
  const hasRoles = resume.experience.items.length > 0

  return (
    <Section id="experience">
      <SectionHeading
        title="Experience"
        subtitle="Formal roles will appear here as they land — for now, here’s where I’m headed."
      />

      {hasRoles ? (
        <div className="space-y-5">
          {resume.experience.items.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.title}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-line bg-panel/90 p-6 transition hover:border-heliotrope/45"
            >
              <h3 className="font-display text-xl font-semibold text-fg">
                {job.title}
              </h3>
              <p className="mt-1 text-heliotrope">
                {job.company} · {job.period}
              </p>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-mist">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-heliotrope" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-heliotrope/40 bg-gradient-to-br from-heliotrope/15 via-panel to-panel p-7 sm:p-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="cyber-grid absolute inset-0 opacity-30" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-heliotrope/40 bg-void/40 px-3 py-1 text-xs font-semibold text-heliotrope">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-heliotrope opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-heliotrope" />
                </span>
                Open to work
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Looking for my next chapter
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                {resume.experience.openTo}. Currently building mini projects and
                sharpening frontend / full-stack skills — detailed experience
                entries to be added soon.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {seekingTags.map((tag, i) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full border border-line bg-void/40 px-3 py-1.5 text-sm font-medium text-mist"
                  >
                    {tag}
                  </motion.li>
                ))}
              </ul>

              <a
                href={`mailto:${resume.email}?subject=Opportunity%20for%20Lenard%20Macatangay`}
                className="btn-base btn-primary mt-8"
              >
                Reach out →
              </a>
            </div>
          </motion.div>

          <motion.ol
            className="relative space-y-0 rounded-2xl border border-line bg-panel/90 p-6 sm:p-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
            }}
          >
            <h4 className="mb-6 font-display text-lg font-semibold text-fg">
              Path ahead
            </h4>
            {timeline.map((item, i) => (
              <motion.li
                key={item.label}
                className="relative flex gap-4 pb-8 last:pb-0"
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {i < timeline.length - 1 ? (
                  <motion.span
                    aria-hidden
                    className="absolute top-8 left-[15px] w-px origin-top bg-gradient-to-b from-heliotrope/50 to-line"
                    initial={{ scaleY: 0, height: 'calc(100% - 20px)' }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.14 }}
                  />
                ) : null}
                <motion.span
                  className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    item.active
                      ? 'accent-shadow-20 border-heliotrope bg-heliotrope text-void'
                      : 'border-line bg-panel-2 text-muted'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.label === 'Now' ? '●' : i + 1}
                </motion.span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-heliotrope">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-fg">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      )}
    </Section>
  )
}
