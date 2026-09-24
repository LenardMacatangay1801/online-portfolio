import { useState } from 'react'
import { applyTheme, readTheme, themes, type ThemeId } from '../theme'

export function ThemePicker({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>(() => readTheme())

  function pick(id: ThemeId) {
    setTheme(id)
    applyTheme(id)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Color scheme"
      className={`flex items-center gap-1.5 ${className}`}
    >
      {themes.map((item) => {
        const selected = theme === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={item.label}
            title={item.label}
            onClick={() => pick(item.id)}
            className={`h-4 w-4 rounded-full border transition duration-150 sm:h-5 sm:w-5 ${
              selected
                ? 'scale-110 border-fg ring-2 ring-fg ring-offset-2 ring-offset-void'
                : 'border-fg/30 hover:scale-105 hover:border-fg/70'
            }`}
            style={{
              background: item.swatch,
              boxShadow: selected ? `0 0 12px ${item.swatch}` : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
