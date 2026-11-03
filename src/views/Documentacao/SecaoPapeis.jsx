import { RoleCard } from '../../components/RoleCard.jsx'

const PAPEIS = [
  { title: 'Contribuidor', who: 'Qualquer designer', items: ['Propõe antes de construir', 'Constrói em branch e preenche o checklist', 'Aplica os ajustes e atualiza os arquivos de uso'] },
  { title: 'Guardião', who: '1 por frente (App, Site, PDV) e 1 do Foundation', items: ['Tria propostas e confirma o nível', 'Aprova N1 e N2, participa de N3', 'Revisa outras frentes, nunca a própria'] },
  { title: 'DS owner', who: 'Jeff Dantas', items: ['Padrões, guia e critérios de pronto', 'Foundation e validação N3', 'Forma Guardiões e faz auditoria quinzenal com rollback'], highlight: true },
  { title: 'Aprovador', who: 'Líder de Design', items: ['Exceções de fila e conflitos de prioridade', 'Revisão trimestral do modelo'] },
  { title: 'Tecnologia', who: 'Time de engenharia', items: ['Recebe tokens exportados', 'Implementa em código', 'Reporta bugs e desvios'] },
]

export function SecaoPapeis() {
  return (
    <section className="section" id="s-papeis">
      <span className="eyebrow">Papéis</span>
      <h2>Quem faz o quê</h2>
      <div className="grid2 roles">
        {PAPEIS.map((p) => (
          <RoleCard key={p.title} title={p.title} who={p.who} items={p.items} highlight={p.highlight} />
        ))}
      </div>
    </section>
  )
}
