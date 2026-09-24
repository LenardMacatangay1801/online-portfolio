import { motion, useReducedMotion } from 'framer-motion'

/** Soft heliotrope atmosphere shared across the whole page */
export function PageAtmosphere() {
  const reduce = useReducedMotion()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-void" />

      <motion.div
        className="accent-atmos absolute -top-[10%] right-[-5%] h-[55vh] w-[55vw] rounded-full blur-2xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -30, 10, 0], y: [0, 20, -10, 0], opacity: [0.7, 1, 0.8, 0.7] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="accent-atmos-soft absolute top-[35%] left-[-10%] h-[45vh] w-[45vw] rounded-full blur-2xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 25, -15, 0], y: [0, -18, 12, 0], opacity: [0.6, 0.9, 0.7, 0.6] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="accent-atmos-dim absolute top-[62%] right-[5%] h-[40vh] w-[40vw] rounded-full blur-2xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -20, 15, 0], y: [0, 15, -20, 0] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="accent-atmos-faint absolute bottom-[-5%] left-[20%] h-[35vh] w-[50vw] rounded-full blur-2xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 18, -12, 0], opacity: [0.5, 0.85, 0.6, 0.5] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-[20%] left-[30%] h-[30vh] w-[30vw] rounded-full bg-[radial-gradient(circle,rgba(92,225,255,0.05),transparent_70%)] blur-2xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-[15%] right-[25%] h-[28vh] w-[28vw] rounded-full bg-[radial-gradient(circle,rgba(92,225,255,0.04),transparent_70%)] blur-2xl" />

      <div className="cyber-grid absolute inset-0 opacity-25" />
    </div>
  )
}
