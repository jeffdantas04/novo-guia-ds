export const TIPOS = {
  correcao: {
    nome: 'Correção', p: 'P1',
    desc: 'Bug em componente, token ou ícone já publicado.',
    subs: {
      simples: { nome: 'Correção simples', desc: 'Não muda o comportamento nem a API do item.', nivel: 1, prazo: 'Até 1 dia útil', valida: 'Checagem automática + par' },
      breaking: { nome: 'Correção com breaking change', desc: 'Altera propriedades ou quebra arquivos que usam o item.', nivel: 3, prazo: 'Até 1 dia útil', valida: 'Checagem automática + par' },
    },
  },
  ajuste: {
    nome: 'Ajuste de token', p: 'P2', foundation: true,
    desc: 'Mudança em token existente: cor, radius, spacing.',
    subs: {
      ajuste: { nome: 'Ajuste de token', desc: 'Altera o valor de um token do Foundation.', nivel: 3, prazo: 'Até 3 dias úteis', valida: 'DS owner ou Guardião do Foundation' },
    },
  },
  componente: {
    nome: 'Componente', p: 'P3',
    desc: 'Componente novo na biblioteca.',
    subs: {
      atom: { nome: 'Atom', desc: 'Button, Badge, Tag, Tooltip.', nivel: 2, prazo: '2 dias úteis', valida: 'Checagem automática + Guardião' },
      molecule: { nome: 'Molecule', desc: 'Input, Card, Toast, Search.', nivel: 2, prazo: '4 dias úteis', valida: 'Checagem automática + Guardião' },
      organism: { nome: 'Organism', desc: 'Modal, Header, Tabs, Table.', nivel: 3, prazo: '7 dias úteis', valida: 'Guardião + DS owner' },
    },
  },
  token: {
    nome: 'Token novo', p: 'P4', foundation: true,
    desc: 'Novo token no Foundation ou nova escala.',
    subs: {
      primitivo: { nome: 'Primitivo', desc: 'Novo valor bruto na escala.', nivel: 3, prazo: '5 dias úteis', valida: 'DS owner' },
      semantico: { nome: 'Semântico', desc: 'Novo papel apontando para primitivos.', nivel: 3, prazo: '8 dias úteis', valida: 'DS owner' },
    },
  },
  icone: {
    nome: 'Ícone', p: 'P5',
    desc: 'Ícone novo ou família completa.',
    subs: {
      individual: { nome: 'Individual', desc: 'Um ícone, nos 5 tamanhos.', nivel: 1, prazo: '1 dia útil', valida: 'Checagem automática + par' },
      set: { nome: 'Set', desc: 'Família ou cluster de ícones.', nivel: 2, prazo: '3 dias úteis', valida: 'Checagem automática + Guardião' },
    },
  },
}

export const NIVEL = { 1: 'N1 · Baixo', 2: 'N2 · Médio', 3: 'N3 · Alto' }

export const STEPS = [
  'Tipo e modo',
  'Identificação',
  'Proposta',
  'Detalhes',
  'Referências',
  'Revisão e envio',
]

export const DOC_NAV = [
  ['s-visao', 'Visão geral'],
  ['s-niveis', 'Níveis de impacto'],
  ['s-prazos', 'Tipos e prazos'],
  ['s-camadas', 'Como validamos'],
  ['s-fluxo', 'Fluxo e status'],
  ['s-papeis', 'Papéis'],
  ['s-pronto', 'Critérios de pronto'],
  ['s-kit', 'Kit do contribuidor'],
  ['s-banco', 'Banco de oportunidades'],
  ['s-local', 'Local antes de global'],
  ['s-metricas', 'Como medimos'],
  ['s-faq', 'Canais e dúvidas'],
]

export function calcularRegras(state) {
  const t = TIPOS[state.tipo]
  if (!t || !state.sub) return null
  const sub = t.subs[state.sub]
  const base = sub.nivel
  const nivel = Math.max(base, state.nivel || base)

  const valida =
    t.foundation || nivel === base
      ? sub.valida
      : { 2: 'Checagem automática + Guardião', 3: 'Guardião + DS owner' }[nivel]

  const construtor = t.foundation
    ? 'DS owner ou Guardião do Foundation'
    : state.modo === 'construir'
    ? state.nome || 'Você'
    : 'A definir no Banco de oportunidades'

  const destino = t.foundation
    ? 'Fila do Foundation'
    : state.modo === 'construir'
    ? 'Proposta para o Guardião, depois construção em branch'
    : 'Proposta para o Guardião, depois Banco de oportunidades'

  return { t, sub, base, nivel, valida, construtor, destino, prazo: sub.prazo }
}
