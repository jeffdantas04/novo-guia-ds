import { RoleCard } from '../../components/RoleCard.jsx'

export function SecaoCamadas() {
  return (
    <section className="section" id="s-camadas">
      <span className="eyebrow">Como validamos</span>
      <h2>Quatro camadas de validação</h2>
      <div className="grid2">
        <RoleCard
          title="Checagem automática"
          who="Primeiro filtro, antes de qualquer revisão humana. Uma auditoria na branch verifica tokens vinculados em fill, stroke, padding, gap e radius, nomenclatura e variantes, contraste WCAG 2.1 AA e padrão de ícones. Se reprovar, volta direto ao contribuidor."
        />
        <RoleCard
          title="Rede de Guardiões"
          who="Um designer por frente (App, Site, PDV) e um do Foundation, treinados nos padrões do DS e com autoridade para aprovar N1 e N2. Revisam outras frentes, nunca a própria."
        />
        <RoleCard
          title="Aprovação por silêncio"
          who="Para N1 e N2, depois da checagem e do aval do revisor, o item entra em janela de objeção de 3 dias úteis. Sem objeção registrada, está aprovado."
        />
        <RoleCard
          title="Auditoria posterior"
          who="O DS owner audita por amostragem, a cada 15 dias, o que foi publicado, com poder de rollback. Erros recorrentes viram melhoria no guia e no checklist de pronto."
        />
      </div>
    </section>
  )
}
