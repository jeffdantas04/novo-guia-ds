import { PrincipleBlock } from '../../components/PrincipleBlock.jsx'

export function SecaoVisao() {
  return (
    <section className="section" id="s-visao">
      <span className="eyebrow">Visão geral</span>
      <h2>Todos constroem. A validação acompanha o risco.</h2>
      <p>O DS não tem uma pessoa dedicada a construir componentes. Por isso, quem precisa de algo pode construir, e cada contribuição passa pelo nível de validação que o seu impacto exige. Mudanças pequenas são validadas por pares; mudanças estruturais passam pelo DS owner.</p>
      <PrincipleBlock title="O DS owner define as regras, não carimba cada entrega">
        Padrões, critérios de pronto e níveis de risco ficam com o DS owner. A validação do dia a dia é distribuída entre checagem automática, pares e Guardiões. O prazo publicado mede o tempo de validação, não o tempo de construção.
      </PrincipleBlock>
    </section>
  )
}
