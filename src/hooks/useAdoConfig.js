import { useState } from 'react'

const KEY = 'ds-contrib-ado-v1'
const VAZIO = { org: '', project: '', pat: '', workItemType: 'User Story' }

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { ...VAZIO } } catch { return { ...VAZIO } }
}

function persist(cfg) {
  try { localStorage.setItem(KEY, JSON.stringify(cfg)) } catch {}
}

export function useAdoConfig() {
  const [config, setConfigRaw] = useState(load)

  function setConfig(updates) {
    setConfigRaw(prev => {
      const next = { ...prev, ...updates }
      persist(next)
      return next
    })
  }

  const isConfigured = !!(config.org && config.project && config.pat)

  return { config, setConfig, isConfigured }
}
