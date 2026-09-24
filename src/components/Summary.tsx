import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'
import { chipItem, fadeUp, staggerContainer, tapSoft, viewOnce } from '../lib/motion'

const emphasis = 'Frontend / Full-Stack Website Developer'

const tracks = [
  {
    label: 'Front end',
    items: resume.skills.frontend,
  },
  {
    label: 'Application logic',
    items: resume.skills.backend,
  },
  {
    label: 'Databases & platforms',
    items: resume.skills.databases,
  },
] as const

const facts = [
  { label: 'Year', value: resume.education.yearLevel },
  { label: 'Program', value: resume.education.degree },
  { label: 'School', value: resume.education.school },
  { label: 'Graduation', value: resume.education.expectedGraduation },
] as const

function sentencesOf(text: string) {
  return text.match(/[^.!?]+[.!?]+/g)?.map((part) => part.trim()) ?? [text]
}

function Lead({ text }: { text: string }) {
  const index = text.indexOf(emphasis)
  if (index === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, index)}
      <span className="text-heliotrope">{emphasis}</span>
      {text.slice(index + emphasis.length)}
    </>
  )
}

export function Summary() {
  const sentences = sentencesOf(resume.summary)
  const lead = sentences[0] ?? resume.summary
  const closer = sentences.length > 1 ? sentences[sentences.length - 1] : null

  return (
    <Section id="summary">
      <SectionHeading
        title="Professional Summary"
        subtitle="Who I am and what I bring to a product team."
      />

      <motion.article
        className="relative overflow-hidden rounded-2xl border border-line bg-panel/80"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewOnce}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-heliotrope/12 blur-3xl"
        />
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 h-full w-1 origin-top bg-heliotrope"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <p className="max-w-4xl font-display text-xl leading-snug font-semibold tracking-tight text-fg sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
            <Lead text={lead} />
          </p>

          <motion.dl
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewOnce}
          >
            {facts.map((fact) => (
              <motion.div
                key={fact.label}
                variants={chipItem}
                className="rounded-xl border border-line bg-void/35 px-4 py-3"
              >
                <dt className="text-xs font-medium text-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug font-medium text-fg">{fact.value}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10">
            <div>
              <p className="text-xs font-medium text-muted">Target roles</p>
              <ul className="mt-3 flex flex-col gap-2">
                {resume.roles.map((role) => (
                  <motion.li key={role} whileHover={{ x: 4 }} whileTap={tapSoft}>
                    <span className="flex items-center gap-3 rounded-xl border border-heliotrope/30 bg-heliotrope/10 px-3 py-2.5 text-sm font-medium text-heliotrope">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-heliotrope" />
                      {role}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium text-muted">Based in</p>
              <p className="mt-1 text-sm leading-relaxed text-mist">{resume.location}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted">Builds with</p>
              <ul className="mt-3 flex flex-col gap-3">
                {tracks.map((track) => (
                  <li key={track.label}>
                    <p className="text-sm font-medium text-fg">{track.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mist">
                      {track.items.join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {closer ? (
            <p className="mt-6 max-w-3xl border-t border-line pt-6 text-base leading-relaxed text-mist">
              {closer}
            </p>
          ) : null}
        </div>
      </motion.article>
    </Section>
  )
}
