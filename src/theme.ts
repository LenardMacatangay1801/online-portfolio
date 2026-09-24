export const themes = [
  {
    id: 'ink',
    label: 'Black',
    swatch: 'linear-gradient(135deg, #111111 52%, #f4f4f5 52%)',
  },
  { id: 'heliotrope', label: 'Heliotrope', swatch: '#df73ff' },
  { id: 'rose', label: 'Pink', swatch: '#ff4d8d' },
  { id: 'red', label: 'Red', swatch: '#ff3b3b' },
  { id: 'blue', label: 'Blue', swatch: '#3b82f6' },
] as const

export type ThemeId = (typeof themes)[number]['id']

const STORAGE_KEY = 'resume-theme'

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return themes.some((theme) => theme.id === value)
}

export function readTheme(): ThemeId {
  const current = document.documentElement.dataset.theme
  if (isThemeId(current)) return current
  return 'heliotrope'
}

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage can be blocked; the choice still applies for this visit */
  }
}
