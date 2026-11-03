function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

export function montarCamposADO(state, r) {
  if (!r) return null

  const title = `[${r.t.p}·N${r.nivel}] ${state.titulo || 'Sem nome'}`

  const descricaoHtml = [
    '<h3>Problema</h3>',
    `<p>${esc(state.problema || '-')}</p>`,
    '<h3>Por que o existente não atende</h3>',
    `<p>${esc(state.existente || '-')}</p>`,
    '<h3>Superfícies</h3>',
    `<p>${esc(state.superficies.join(', ') || '-')}</p>`,
    '<h3>Tokens envolvidos</h3>',
    `<p>${esc(state.tokens || '-')}</p>`,
    '<h3>Referências visuais</h3>',
    `<p>${esc(state.refs || '-')}</p>`,
    '<h3>Validação de produto</h3>',
    `<p>${esc(state.aprovacao || '-')}</p>`,
    '<hr/>',
    `<p><em>Proposta por ${esc(state.nome || '-')} (${esc(state.frente || '-')}) · ${esc(r.t.nome)} ${esc(r.sub.nome)} · Valida: ${esc(r.valida)} · Prazo: ${esc(r.prazo)}</em></p>`,
  ].join('\n')

  const acHtml = [
    '<ul>',
    '<li>[ ] Variantes documentadas (cor, tamanho e hierarquia como propriedades)</li>',
    '<li>[ ] Estados completos (hover, focus, active, disabled, error, loading)</li>',
    '<li>[ ] Tokens vinculados em fill, stroke, padding, gap e radius</li>',
    '<li>[ ] WCAG 2.1 AA (contraste 4.5:1, foco visível, toque 44×44px, labels)</li>',
    '<li>[ ] Documentação de uso (o que é, quando usar, quando não usar, exemplo)</li>',
    '</ul>',
  ].join('\n')

  const tags = [
    'DS Contribuição',
    r.t.p,
    `N${r.nivel}`,
    r.t.nome,
    r.sub.nome,
    ...state.superficies,
  ].filter(Boolean).join('; ')

  return { title, descricaoHtml, acHtml, tags }
}
