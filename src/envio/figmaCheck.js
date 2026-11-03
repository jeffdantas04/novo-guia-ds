function extractFileKey(url) {
  const s = url.trim()
  // branch-id query param is the branch's own file key
  const branch = s.match(/[?&]branch-id=([A-Za-z0-9]+)/)
  if (branch) return branch[1]
  // path: /file/KEY or /design/KEY
  const path = s.match(/\/(?:file|design)\/([A-Za-z0-9]+)/)
  if (path) return path[1]
  // raw key
  if (/^[A-Za-z0-9]{10,}$/.test(s)) return s
  return null
}

function collectNodes(node, out = []) {
  if (!node) return out
  out.push(node)
  if (node.children) node.children.forEach(c => collectNodes(c, out))
  return out
}

async function fetchFile(key, pat) {
  const res = await fetch(`https://api.figma.com/v1/files/${key}`, {
    headers: { 'X-Figma-Token': pat },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.err || `HTTP ${res.status}: ${body.message || 'Erro desconhecido'}`)
  }
  return res.json()
}

function checkNomenclatura(nodes) {
  const comps = nodes.filter(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')
  if (comps.length === 0) return { status: 'skip', msg: 'Nenhum componente encontrado' }

  const failing = comps.filter(n => {
    const base = (n.name || '').split('/')[0].trim()
    if (!base) return true
    if (base.startsWith('_') || base.startsWith('.')) return true
    // Flag names that are entirely lowercase (longer than 2 chars) — PascalCase expected
    if (base.length > 2 && base === base.toLowerCase()) return true
    return false
  })

  const passed = comps.length - failing.length
  const status = failing.length === 0 ? 'pass' : failing.length <= 2 ? 'warn' : 'fail'
  return {
    status,
    msg: `${passed}/${comps.length} componentes dentro do padrão`,
    items: failing.slice(0, 5).map(n => n.name),
  }
}

function checkVariantes(nodes) {
  const sets = nodes.filter(n => n.type === 'COMPONENT_SET')
  if (sets.length === 0) return { status: 'skip', msg: 'Nenhum component set encontrado' }

  const failing = sets.filter(n => {
    const defs = n.componentPropertyDefinitions
    return !defs || Object.keys(defs).length === 0
  })

  const passed = sets.length - failing.length
  const status = failing.length === 0 ? 'pass' : failing.length <= 2 ? 'warn' : 'fail'
  return {
    status,
    msg: `${passed}/${sets.length} component sets com propriedades de variante`,
    items: failing.slice(0, 5).map(n => n.name),
  }
}

function checkTokens(nodes) {
  const frames = nodes.filter(n => n.type === 'FRAME' || n.type === 'COMPONENT')
  if (frames.length === 0) return { status: 'skip', msg: 'Nenhum frame verificável encontrado' }

  let total = 0
  const hardcoded = []

  frames.forEach(node => {
    const bv = node.boundVariables || {}

    // fills
    const solidFills = (node.fills || []).filter(f => f.type === 'SOLID' && f.visible !== false)
    if (solidFills.length > 0) {
      total++
      const bound = Array.isArray(bv.fills) && bv.fills.some(b => b?.type === 'VARIABLE_ALIAS')
      if (!bound) hardcoded.push({ name: node.name, prop: 'fill' })
    }

    // padding
    const pads = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
    const hasPad = pads.some(p => (node[p] || 0) > 0)
    if (hasPad) {
      total++
      const bound = pads.some(p => bv[p]?.type === 'VARIABLE_ALIAS')
      if (!bound) hardcoded.push({ name: node.name, prop: 'padding' })
    }

    // gap
    if ((node.itemSpacing || 0) > 0) {
      total++
      if (bv.itemSpacing?.type !== 'VARIABLE_ALIAS') hardcoded.push({ name: node.name, prop: 'gap' })
    }

    // radius
    if ((node.cornerRadius || 0) > 0) {
      total++
      if (bv.cornerRadius?.type !== 'VARIABLE_ALIAS') hardcoded.push({ name: node.name, prop: 'radius' })
    }
  })

  if (total === 0) return { status: 'skip', msg: 'Nenhuma propriedade verificável encontrada' }

  const passed = total - hardcoded.length
  const pct = Math.round((passed / total) * 100)
  const status = pct >= 90 ? 'pass' : pct >= 70 ? 'warn' : 'fail'

  // dedupe by name+prop
  const seen = new Set()
  const unique = hardcoded.filter(h => {
    const k = h.name + h.prop
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  return {
    status,
    msg: `${passed}/${total} propriedades com token vinculado (${pct}%)`,
    items: unique.slice(0, 5).map(h => `${h.name} → ${h.prop}`),
  }
}

function checkIcones(nodes) {
  const SIZES = [16, 20, 24, 32, 40]
  const iconSets = nodes.filter(n => n.type === 'COMPONENT_SET' && /icon/i.test(n.name))

  if (iconSets.length === 0) return { status: 'skip', msg: 'Nenhum set de ícone encontrado' }

  let passing = 0
  const failing = []

  iconSets.forEach(set => {
    const sizes = (set.children || []).map(c => {
      const bb = c.absoluteBoundingBox
      return bb ? Math.round(bb.width) : null
    }).filter(Boolean)

    const hasAll = SIZES.every(s => sizes.includes(s))
    if (hasAll) passing++
    else failing.push(`${set.name} (encontrado: ${[...new Set(sizes)].join(', ')}px)`)
  })

  const status = failing.length === 0 ? 'pass' : failing.length < iconSets.length ? 'warn' : 'fail'
  return {
    status,
    msg: `${passing}/${iconSets.length} sets com os 5 tamanhos (16, 20, 24, 32, 40px)`,
    items: failing.slice(0, 5),
  }
}

function checkContraste(nodes) {
  const textNodes = nodes.filter(n => n.type === 'TEXT')
  if (textNodes.length === 0) return { status: 'skip', msg: 'Nenhum nó de texto encontrado' }

  const hardcoded = textNodes.filter(n => {
    const solidFill = (n.fills || []).find(f => f.type === 'SOLID' && f.visible !== false)
    if (!solidFill) return false
    const bv = n.boundVariables || {}
    const bound = Array.isArray(bv.fills) && bv.fills.some(b => b?.type === 'VARIABLE_ALIAS')
    return !bound
  })

  if (hardcoded.length > 0) {
    return {
      status: 'warn',
      msg: `${hardcoded.length} texto(s) com cor fixa — WCAG não pode ser verificado sem tokens`,
      items: hardcoded.slice(0, 3).map(n => n.name || 'Text'),
    }
  }

  return {
    status: 'pass',
    msg: 'Todos os textos usam tokens de cor — contraste verificável via plugin Stark/Color Blind',
  }
}

export async function executarChecagem(fileUrl, pat) {
  const fileKey = extractFileKey(fileUrl)
  if (!fileKey) throw new Error('URL inválida — cole o link completo da branch no Figma')

  const data = await fetchFile(fileKey, pat)
  const nodes = collectNodes(data.document)

  return {
    fileName: data.name,
    lastModified: data.lastModified,
    checks: {
      nomenclatura: checkNomenclatura(nodes),
      variantes: checkVariantes(nodes),
      tokens: checkTokens(nodes),
      icones: checkIcones(nodes),
      contraste: checkContraste(nodes),
    },
  }
}

export function resumoChecagem(result) {
  if (!result) return null
  const labels = { nomenclatura: 'Nomenclatura', variantes: 'Variantes', tokens: 'Tokens', icones: 'Ícones', contraste: 'Contraste' }
  const icons = { pass: '✓', fail: '✗', warn: '⚠', skip: '–' }
  return Object.entries(result.checks)
    .map(([k, c]) => `${icons[c.status]} ${labels[k]}`)
    .join(' · ')
}
