import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { resume } from '../data/resume'
import { Section, SectionHeading } from './SectionHeading'
import { listItem, staggerFast, tapSoft, viewOnce } from '../lib/motion'

type SkillMeta = {
  name: string
  groupId: string
  /** simpleicons slug — omit for letter badge */
  slug?: string
  color?: string
}

const skillCatalog: SkillMeta[] = [
  { name: 'HTML5', groupId: 'frontend', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', groupId: 'frontend', slug: 'css', color: '663399' },
  {
    name: 'Responsive Design',
    groupId: 'frontend',
  },
  { name: 'JavaScript', groupId: 'frontend', slug: 'javascript', color: 'F7DF1E' },
  { name: 'React', groupId: 'frontend', slug: 'react', color: '61DAFB' },
  { name: 'Node.js', groupId: 'backend', slug: 'nodedotjs', color: '5FA04E' },
  { name: 'PHP', groupId: 'backend', slug: 'php', color: '777BB4' },
  { name: 'Python', groupId: 'backend', slug: 'python', color: '3776AB' },
  { name: 'Java', groupId: 'backend', slug: 'openjdk', color: '437291' },
  { name: 'PostgreSQL', groupId: 'databases', slug: 'postgresql', color: '4169E1' },
  { name: 'MongoDB', groupId: 'databases', slug: 'mongodb', color: '47A248' },
  { name: 'Supabase', groupId: 'databases', slug: 'supabase', color: '3FCF8E' },
  { name: 'Firebase', groupId: 'databases', slug: 'firebase', color: 'DD2C00' },
  { name: 'Problem-solving', groupId: 'soft' },
  { name: 'Attention to detail', groupId: 'soft' },
  { name: 'Communication', groupId: 'soft' },
  { name: 'Collaboration', groupId: 'soft' },
  { name: 'Self-directed learning', groupId: 'soft' },
  { name: 'Time management', groupId: 'soft' },
]

const groups = [
  {
    id: 'frontend',
    label: 'Front-End',
    description: 'Interfaces people actually use',
    items: resume.skills.frontend,
  },
  {
    id: 'backend',
    label: 'Back-End & Languages',
    description: 'Logic, APIs, and server-side work',
    items: resume.skills.backend,
  },
  {
    id: 'databases',
    label: 'Databases & Services',
    description: 'Data and cloud backends',
    items: resume.skills.databases,
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    description: 'How I work with people and problems',
    items: resume.skills.soft,
  },
] as const

const metaByName = Object.fromEntries(
  skillCatalog.map((s) => [s.name, s]),
) as Record<string, SkillMeta>

function skillDomId(name: string) {
  return `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function logoUrl(slug: string, color = 'DF73FF') {
  return `https://cdn.simpleicons.org/${slug}/${color}`
}

function SkillIcon({
  skill,
  size = 22,
}: {
  skill: SkillMeta
  size?: number
}) {
  if (skill.slug) {
    return (
      <img
        src={logoUrl(skill.slug, skill.color)}
        alt=""
        width={size}
        height={size}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
        loading="lazy"
      />
    )
  }

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-md bg-heliotrope/15 font-display text-[10px] font-semibold text-heliotrope ring-1 ring-heliotrope/30"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {skill.name.charAt(0)}
    </span>
  )
}

function SkillMarquee({
  items,
  direction = 'left',
  duration = 40,
  onSelect,
}: {
  items: SkillMeta[]
  direction?: 'left' | 'right'
  duration?: number
  onSelect: (skill: SkillMeta) => void
}) {
  const track = [...items, ...items]

  return (
    <div className="skill-marquee relative overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void/90 to-transparent sm:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void/90 to-transparent sm:w-24"
        aria-hidden
      />
      <div
        className={`skill-marquee-track flex w-max gap-4 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((logo, i) => (
          <button
            key={`${logo.name}-${i}`}
            type="button"
            onClick={() => onSelect(logo)}
            className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 rounded-xl border border-line/80 bg-panel/80 px-3 py-2.5 text-left backdrop-blur-sm transition hover:border-heliotrope/60 hover:bg-panel hover:accent-shadow-24-soft sm:gap-3 sm:px-4 sm:py-3"
            title={`Go to ${logo.name}`}
          >
            <SkillIcon skill={logo} size={28} />
            <span className="text-sm font-medium text-mist">{logo.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const techOnly = skillCatalog.filter((s) => s.groupId !== 'soft')
  const rowA = techOnly.filter((_, i) => i % 2 === 0)
  const rowB = techOnly.filter((_, i) => i % 2 === 1)

  const jumpToSkill = useCallback((skill: SkillMeta) => {
    setActiveGroup(skill.groupId)
    setActiveSkill(skill.name)

    const groupEl = document.getElementById(`skill-group-${skill.groupId}`)
    const skillEl = document.getElementById(skillDomId(skill.name))

    groupEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    window.setTimeout(() => {
      skillEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 280)

    window.setTimeout(() => {
      setActiveSkill(null)
      setActiveGroup(null)
    }, 2600)
  }, [])

  return (
    <Section id="skills" className="overflow-hidden">
      <SectionHeading
        title="Technical Skills"
        subtitle="Tools and strengths I use to ship web experiences."
      />

      <div className="mb-12 space-y-4">
        <SkillMarquee
          items={rowA}
          direction="left"
          duration={38}
          onSelect={jumpToSkill}
        />
        <SkillMarquee
          items={rowB}
          direction="right"
          duration={46}
          onSelect={jumpToSkill}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
        {groups.map((group, gi) => {
          const isGroupActive = activeGroup === group.id
          return (
            <motion.div
              key={group.id}
              id={`skill-group-${group.id}`}
              className={`group relative scroll-mt-28 overflow-hidden rounded-2xl border bg-panel/90 p-3 transition lg:p-6 ${
                isGroupActive
                  ? 'accent-shadow-40 border-heliotrope'
                  : 'border-line hover:border-heliotrope/45'
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: gi * 0.06 }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-heliotrope/10 blur-2xl transition group-hover:bg-heliotrope/20"
              />
              <div className="relative">
                <h3 className="font-display text-sm font-semibold tracking-tight text-fg lg:text-lg">
                  {group.label}
                </h3>
                <p className="mt-0.5 text-[11px] leading-snug text-muted lg:mt-1 lg:text-sm">
                  {group.description}
                </p>
              </div>
              <motion.ul
                className="relative mt-2.5 flex flex-col gap-1 lg:mt-5 lg:gap-2"
                variants={staggerFast}
                initial="hidden"
                whileInView="show"
                viewport={viewOnce}
              >
                {group.items.map((name) => {
                  const meta = metaByName[name] ?? {
                    name,
                    groupId: group.id,
                  }
                  const isActive = activeSkill === name
                  return (
                    <motion.li
                      key={name}
                      id={skillDomId(name)}
                      variants={listItem}
                      whileHover={{ x: 4 }}
                      whileTap={tapSoft}
                      className={`flex scroll-mt-32 items-center gap-1.5 py-0.5 lg:gap-3 lg:rounded-xl lg:px-3 lg:py-2.5 lg:transition ${
                        isActive
                          ? 'text-fg lg:bg-heliotrope/20 lg:ring-1 lg:ring-heliotrope/60'
                          : 'text-mist lg:bg-panel-2 lg:ring-1 lg:ring-fg/8'
                      }`}
                    >
                      <span
                        className={`h-1 w-1 shrink-0 rounded-full lg:hidden ${
                          isActive ? 'bg-fg' : 'bg-heliotrope'
                        }`}
                        aria-hidden
                      />
                      <span className="hidden lg:inline-flex">
                        <SkillIcon skill={meta} size={22} />
                      </span>
                      <span className="text-[11px] leading-tight font-medium lg:text-sm">{name}</span>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
