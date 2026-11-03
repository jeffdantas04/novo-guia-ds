import { useState, useEffect } from 'react'

const MODES = ['system', 'light', 'dark']
const LABELS = { system: 'Sistema', light: 'Claro', dark: 'Escuro' }
const STORAGE_KEY = 'ds-contrib-theme'

export function useTheme() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'system' } catch { return 'system' }
  })

  useEffect(() => {
    if (mode === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', mode)
    }
    try { localStorage.setItem(STORAGE_KEY, mode) } catch {}
  }, [mode])

  function cycle() {
    setMode(m => MODES[(MODES.indexOf(m) + 1) % MODES.length])
  }

  return { mode, label: LABELS[mode], cycle }
}
