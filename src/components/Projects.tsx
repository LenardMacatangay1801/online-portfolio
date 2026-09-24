import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'
import { SoonButton } from './SoonButton'

type Project = (typeof resume.projects)[number]
type Filter = 'All' | 'In progress' | 'Pending'

const filters: Filter[] = ['All', 'In progress', 'Pending']

const stackIcons: Record<string, { slug: string; color: string }> = {
  HTML: { slug: 'html5', color: 'E34F26' },
  CSS: { slug: 'css', color: '663399' },
  JavaScript: { slug: 'javascript', color: 'F7DF1E' },
  React: { slug: 'react', color: '61DAFB' },
  'Node.js': { slug: 'nodedotjs', color: '5FA04E' },
  PHP: { slug: 'php', color: '777BB4' },
  Supabase: { slug: 'supabase', color: '3FCF8E' },
  XAMPP: { slug: 'apache', color: 'D22128' },
}

function iconUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`
}

function statusStyles(status: Project['status']) {
  if (status === 'In progress') {
    return 'border-heliotrope/40 bg-heliotrope/10 text-heliotrope'
  }
  return 'border-neon-yellow/35 bg-neon-yellow/10 text-neon-yellow'
}

function ChromeDots() {
  return (
    <div className="mb-2 flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-heliotrope/80" />
      <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-neon-yellow/70" />
      <span className="ml-2 h-1.5 flex-1 rounded-full bg-fg/10" />
    </div>
  )
}

function FrontendSketch() {
  return (
    <div className="absolute inset-x-3 top-3 bottom-9 rounded-lg border border-fg/10 bg-void/55 p-2 backdrop-blur-sm transition duration-150 group-hover:-translate-y-0.5">
      <ChromeDots />
      <div className="grid h-[calc(100%-1.15rem)] grid-cols-[1.35fr_0.75fr] gap-1.5">
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-2/3 rounded bg-fg/20" />
          <div className="h-1.5 w-1/2 rounded bg-fg/10" />
          <div className="mt-auto min-h-10 flex-1 rounded-md bg-heliotrope/25" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-7 rounded bg-fg/10" />
          <div className="h-7 rounded bg-heliotrope/15" />
          <div className="min-h-6 flex-1 rounded bg-fg/8" />
        </div>
      </div>
    </div>
  )
}

function FullStackSketch() {
  return (
    <div className="absolute inset-x-3 top-3 bottom-9 grid grid-cols-2 gap-1.5 transition duration-150 group-hover:-translate-y-0.5">
      <div className="flex flex-col rounded-lg border border-fg/10 bg-void/55 p-2">
        <div className="mb-2 h-1.5 w-1/2 rounded-full bg-fg/15" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-5 rounded bg-heliotrope/25" />
          <div className="h-5 rounded bg-fg/10" />
          <div className="h-5 rounded bg-fg/10" />
          <div className="mt-auto h-4 rounded bg-fg/8" />
        </div>
      </div>
      <div className="flex flex-col rounded-lg border border-neon-cyan/30 bg-void/70 p-2">
        <div className="mb-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
          <span className="h-1.5 flex-1 rounded-full bg-neon-cyan/25" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-1.5 w-4/5 rounded bg-neon-cyan/50" />
          <div className="h-1.5 w-3/5 rounded bg-neon-cyan/30" />
          <div className="h-1.5 w-2/3 rounded bg-fg/15" />
          <div className="h-1.5 w-1/2 rounded bg-neon-cyan/35" />
          <div className="mt-auto h-7 rounded bg-neon-cyan/10" />
        </div>
      </div>
    </div>
  )
}

function WebsiteSketch() {
  return (
    <div className="absolute inset-x-3 top-3 bottom-9 flex flex-col gap-1.5 rounded-lg border border-neon-yellow/25 bg-void/55 p-2 transition duration-150 group-hover:-translate-y-0.5">
      <div className="flex items-center gap-1">
        <div className="h-2 w-7 rounded bg-neon-yellow/55" />
        <div className="ml-auto h-1.5 w-7 rounded bg-fg/15" />
        <div className="h-1.5 w-7 rounded bg-fg/10" />
        <div className="h-1.5 w-5 rounded bg-fg/10" />
      </div>
      <div className="h-9 rounded-md bg-gradient-to-r from-neon-yellow/30 to-heliotrope/15" />
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
        <div className="rounded bg-fg/10" />
        <div className="rounded bg-neon-yellow/20" />
        <div className="rounded bg-fg/10" />
      </div>
      <div className="h-1.5 rounded bg-fg/10" />
    </div>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  const Sketch =
    project.category === 'Full-Stack'
      ? FullStackSketch
      : project.category === 'Website'
        ? WebsiteSketch
        : FrontendSketch

  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-panel-2">
      <div className="accent-preview absolute inset-0" />
      <div className="cyber-grid absolute inset-0 opacity-40" />
      <Sketch />
      <div className="absolute right-3 bottom-3 rounded-md border border-heliotrope/30 bg-void/60 px-2 py-1 text-[11px] font-medium text-heliotrope backdrop-blur-sm">
        {project.category}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-70" />
    </div>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (p: Project) => void
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        transition: { type: 'tween', duration: 0.12, delay: 0, ease: 'easeOut' },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/90 p-5 transition-[border-color,box-shadow] duration-150 hover:border-heliotrope/50 hover:accent-shadow-card"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-36 w-36 rounded-full bg-heliotrope/10 blur-3xl transition duration-150 group-hover:bg-heliotrope/25"
      />

      <ProjectPreview project={project} />

      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold text-heliotrope/50">
          {project.id}
        </span>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles(project.status)}`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tight text-fg transition group-hover:text-heliotrope">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {project.blurb}
      </p>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium">
          <span className="text-muted">Progress</span>
          <span className="text-heliotrope">{project.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-panel-2 ring-1 ring-fg/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-heliotrope-dim to-heliotrope"
            initial={{ width: 0 }}
            whileInView={{ width: `${project.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
          />
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => {
          const icon = stackIcons[tech]
          return (
            <li
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-2.5 py-1 text-xs font-medium text-mist ring-1 ring-fg/8"
            >
              {icon ? (
                <img
                  src={iconUrl(icon.slug, icon.color)}
                  alt=""
                  className="h-3.5 w-3.5"
                  loading="lazy"
                />
              ) : null}
              {tech}
            </li>
          )
        })}
      </ul>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="btn-base btn-primary flex-1 text-sm"
        >
          View details
        </button>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-base btn-secondary text-sm"
          >
            Live
          </a>
        ) : (
          <SoonButton compact className="shrink-0">
            Soon
          </SoonButton>
        )}
      </div>
    </motion.article>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-void/80 backdrop-blur-md"
        aria-label="Close project details"
        onClick={onClose}
      />
      <motion.div
        className="accent-shadow-60 relative z-10 max-h-[min(92svh,900px)] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-heliotrope/35 bg-panel p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:rounded-2xl sm:p-8 sm:pb-8"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-heliotrope">
              {project.category} · {project.status}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-2xl font-semibold tracking-tight text-fg"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-2.5 py-1 text-sm text-muted transition hover:border-heliotrope/50 hover:text-fg"
          >
            ✕
          </button>
        </div>

        <p className="text-base leading-relaxed text-mist">{project.blurb}</p>

        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-xs font-medium">
            <span className="text-muted">Completion</span>
            <span className="text-heliotrope">{project.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-panel-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-heliotrope-dim to-heliotrope"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <h4 className="mt-6 text-sm font-semibold text-fg">Highlights</h4>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              className="flex items-start gap-2 text-sm text-mist"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heliotrope" />
              {item}
            </motion.li>
          ))}
        </ul>

        <h4 className="mt-6 text-sm font-semibold text-fg">Stack</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => {
            const icon = stackIcons[tech]
            return (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1.5 text-sm text-mist ring-1 ring-fg/8"
              >
                {icon ? (
                  <img
                    src={iconUrl(icon.slug, icon.color)}
                    alt=""
                    className="h-4 w-4"
                  />
                ) : null}
                {tech}
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-primary"
            >
              Open live demo
            </a>
          ) : (
            <SoonButton>Live demo — coming soon</SoonButton>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-secondary"
            >
              GitHub
            </a>
          ) : (
            <SoonButton>GitHub — coming soon</SoonButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return resume.projects
    return resume.projects.filter((p) => p.status === filter)
  }, [filter])

  return (
    <Section id="projects">
      <div className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:mb-0 [&_.mb-10]:mb-0">
          <SectionHeading
            title="Projects"
            subtitle="Work in progress — polished demos and live links will land here soon."
          />
        </div>
        <div
          className="flex w-full shrink-0 flex-wrap gap-2 lg:w-auto"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((item) => {
            const active = filter === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item)}
                className={`min-h-11 flex-1 rounded-full px-3 py-2 text-sm font-semibold transition sm:flex-none sm:px-4 ${
                  active
                    ? 'accent-shadow-24 bg-heliotrope text-void'
                    : 'border border-line bg-panel/60 text-muted hover:border-heliotrope/40 hover:text-heliotrope'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                index={i}
                onOpen={setSelected}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-muted">
          No projects in this filter yet.
        </p>
      ) : null}

      <AnimatePresence>
        {selected ? (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        ) : null}
      </AnimatePresence>
    </Section>
  )
}
