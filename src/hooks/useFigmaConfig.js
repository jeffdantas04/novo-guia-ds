import { useState } from 'react'

const KEY = 'ds-contrib-figma-v1'
const VAZIO = { pat: '', fileUrl: '' }

function load() {
  try { return { ...VAZIO, ...JSON.parse(localStorage.getItem(KEY)) } } catch { return { ...VAZIO } }
}

function persist(cfg) {
  try { localStorage.setItem(KEY, JSON.stringify(cfg)) } catch {}
}

export function useFigmaConfig() {
  const [config, setConfigRaw] = useState(load)

  function setConfig(updates) {
    setConfigRaw(prev => {
      const next = { ...prev, ...updates }
      persist(next)
      return next
    })
  }

  const isConfigured = !!(config.pat && config.fileUrl)
  return { config, setConfig, isConfigured }
}
