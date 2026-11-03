export function MessagePreview({ message, onCopy }) {
  return (
    <div className="field">
      <span className="legend">Mensagem para o canal Design System</span>
      <pre className="msg">{message}</pre>
    </div>
  )
}

export function montarMensagemDisplay(state, r, figmaResult = null) {
  if (!r) return ''
  const sups = state.superficies.join(', ') || '-'
  const checagem = figmaResult
    ? (() => {
        const icons = { pass: '✓', fail: '✗', warn: '⚠', skip: '–' }
        const labels = { nomenclatura: 'Nomenclatura', variantes: 'Variantes', tokens: 'Tokens', icones: 'Ícones', contraste: 'Contraste' }
        return '\nChecagem automática: ' + Object.entries(figmaResult.checks)
          .map(([k, c]) => `${icons[c.status]} ${labels[k]}`)
          .join(' · ')
      })()
    : ''
  return `[Proposta · ${r.t.p} · N${r.nivel}] ${state.titulo || 'Sem nome'}
Tipo: ${r.t.nome} · ${r.sub.nome}
Proponente: ${state.nome || '-'} (${state.frente || '-'})
Modo: ${r.t.foundation ? 'Proposta para o Foundation' : state.modo === 'construir' ? 'Vou construir' : 'Preciso que alguém construa'}
Superfícies: ${sups}

Problema: ${state.problema || '-'}
Por que o existente não atende: ${state.existente || '-'}
Tokens: ${state.tokens || '-'}
Referências: ${state.refs || '-'}
Validação de produto: ${state.aprovacao || '-'}

Validação: ${r.valida} · prazo de ${r.prazo}${checagem}`
}
