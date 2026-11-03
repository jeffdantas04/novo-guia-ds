const ITEMS = [
  { b: 'Guia de contribuição', span: 'Tokens obrigatórios, nomenclatura, variantes e padrão de ícones.' },
  { b: 'Checklist de pronto', span: 'Preenchido pelo contribuidor antes de pedir revisão.' },
  { b: 'Arquivo starter', span: 'Estrutura base de componente no Figma.' },
  { b: 'Template de proposta', span: 'No Kanban e neste portal.' },
  { b: 'Agente de checagem automática', span: 'Auditoria mecânica da branch antes da revisão humana.' },
  { b: 'Trilha de formação dos Guardiões', span: 'Conduzida e calibrada pelo DS owner.' },
]

export function SecaoKit() {
  return (
    <section className="section" id="s-kit">
      <span className="eyebrow">Kit do contribuidor</span>
      <h2>Ninguém começa do zero</h2>
      <p>A qualidade do modelo depende de transferir critério para quem contribui. Estes são os itens mínimos para o lançamento.</p>
      <ul className="checks">
        {ITEMS.map((c, i) => (
          <li key={i}><div><b>{c.b}</b><span>{c.span}</span></div></li>
        ))}
      </ul>
    </section>
  )
}
