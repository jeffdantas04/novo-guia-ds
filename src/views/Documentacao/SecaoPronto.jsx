const CHECKS = [
  { b: 'Variantes documentadas', span: 'Cor, tamanho e hierarquia como propriedades do componente.' },
  { b: 'Estados completos', span: 'Hover, focus, active, disabled, error e loading quando aplicável.' },
  { b: 'Tokens vinculados', span: 'Sem valores fixos. Fill, stroke, padding, gap e radius consomem o Foundation.' },
  { b: 'WCAG 2.1 AA', span: 'Contraste 4.5:1, foco visível, área de toque de 44×44px, labels acessíveis.' },
  { b: 'Documentação de uso', span: 'O que é, quando usar, quando não usar e um exemplo aplicado.' },
]

export function SecaoPronto() {
  return (
    <section className="section" id="s-pronto">
      <span className="eyebrow">Critérios de pronto</span>
      <h2>O que toda contribuição precisa ter</h2>
      <ul className="checks">
        {CHECKS.map((c, i) => (
          <li key={i}><div><b>{c.b}</b><span>{c.span}</span></div></li>
        ))}
      </ul>
    </section>
  )
}
