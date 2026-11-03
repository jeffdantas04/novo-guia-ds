import { useState } from 'react'
import { TIPOS } from '../config/regras.js'

const STORAGE_KEY = 'ds-contrib-proto-v1'

const VAZIO = {
  exemplo: false, step: 0,
  tipo: '', sub: '', modo: '', nivel: 0,
  nome: '', frente: '', titulo: '',
  problema: '', existente: '',
  superficies: [], tokens: '', branch: '', refs: '', aprovacao: '',
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved || { ...VAZIO }
  } catch {
    return { ...VAZIO }
  }
}

function persist(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}

export function useFormState() {
  const [state, setStateRaw] = useState(load)

  function setState(updater) {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      persist(next)
      return next
    })
  }

  function setTipo(tipo) {
    const firstSub = Object.keys(TIPOS[tipo].subs)[0]
    const nivel = TIPOS[tipo].subs[firstSub].nivel
    const modo = TIPOS[tipo].foundation ? '' : state.modo
    setState(s => ({ ...s, tipo, sub: firstSub, nivel, modo }))
  }

  function setSub(sub) {
    const nivel = TIPOS[state.tipo].subs[sub].nivel
    setState(s => ({ ...s, sub, nivel }))
  }

  function setModo(modo) {
    setState(s => ({ ...s, modo }))
  }

  function setNivel(nivel) {
    setState(s => ({ ...s, nivel }))
  }

  function setField(key, value) {
    setState(s => ({ ...s, [key]: value }))
  }

  function toggleSuperficie(nome) {
    setState(s => ({
      ...s,
      superficies: s.superficies.includes(nome)
        ? s.superficies.filter(x => x !== nome)
        : [...new Set([...s.superficies, nome])],
    }))
  }

  function goStep(step) {
    setState(s => ({ ...s, step }))
  }

  function limpar() {
    setState({ ...VAZIO, superficies: [] })
  }

  return {
    state,
    setTipo, setSub, setModo, setNivel,
    setField, toggleSuperficie,
    goStep, limpar,
  }
}
