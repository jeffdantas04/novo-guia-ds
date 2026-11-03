import { TIPOS, calcularRegras } from '../config/regras.js'

/**
 * Monta o objeto de proposta com todos os campos.
 * Use este módulo para conectar a outro destino (Notion, Teams, etc.)
 * sem alterar os componentes.
 */
export function montarProposta(state) {
  const r = calcularRegras(state)
  if (!r) return null

  return {
    // Metadados calculados
    prioridade: r.t.p,
    tipo: r.t.nome,
    escopo: r.sub.nome,
    nivel: r.nivel,
    nivelLabel: `N${r.nivel}`,
    prazo: r.prazo,
    quemConstroi: r.construtor,
    quemValida: r.valida,
    proximoPasso: r.destino,
    isFoundation: !!r.t.foundation,

    // Campos do formulário
    nome: state.nome,
    frente: state.frente,
    titulo: state.titulo,
    modo: r.t.foundation ? 'foundation' : state.modo,
    superficies: state.superficies,
    problema: state.problema,
    existente: state.existente,
    tokens: state.tokens,
    branch: state.branch,
    refs: state.refs,
    aprovacao: state.aprovacao,
  }
}

export function montarMensagemTeams(state) {
  const r = calcularRegras(state)
  if (!r) return ''

  return `[Proposta · ${r.t.p} · N${r.nivel}] ${state.titulo || 'Sem nome'}
Tipo: ${r.t.nome} · ${r.sub.nome}
Proponente: ${state.nome || '-'} (${state.frente || '-'})
Modo: ${r.t.foundation ? 'Proposta para o Foundation' : state.modo === 'construir' ? 'Vou construir' : 'Preciso que alguém construa'}
Superfícies: ${state.superficies.join(', ') || '-'}

Problema: ${state.problema || '-'}
Por que o existente não atende: ${state.existente || '-'}
Tokens: ${state.tokens || '-'}
Referências: ${state.refs || '-'}
Validação de produto: ${state.aprovacao || '-'}

Validação: ${r.valida} · prazo de ${r.prazo}`
}
