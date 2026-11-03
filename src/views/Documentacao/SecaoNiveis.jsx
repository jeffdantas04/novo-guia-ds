import { LevelCard } from '../../components/LevelCard.jsx'

export function SecaoNiveis() {
  return (
    <section className="section" id="s-niveis">
      <span className="eyebrow">Níveis de impacto</span>
      <h2>Três níveis definem quem valida</h2>
      <div className="levels" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
        <LevelCard nivel={1} itens={[
          { dt: 'Escopo', dd: 'Ícone individual, nova variante de componente existente, ajuste de documentação' },
          { dt: 'Valida', dd: 'Checagem automática + 1 par' },
          { dt: 'DS owner', dd: 'Não participa' },
        ]} />
        <LevelCard nivel={2} itens={[
          { dt: 'Escopo', dd: 'Componente novo Atom ou Molecule, set de ícones' },
          { dt: 'Valida', dd: 'Checagem automática + Guardião' },
          { dt: 'DS owner', dd: 'Auditoria posterior' },
        ]} />
        <LevelCard nivel={3} itens={[
          { dt: 'Escopo', dd: 'Organism, breaking change, qualquer alteração no Foundation' },
          { dt: 'Valida', dd: 'Guardião + DS owner' },
          { dt: 'DS owner', dd: 'Participa da revisão' },
        ]} />
      </div>
      <p className="note">
        O contribuidor indica o nível na proposta e o Guardião confirma ou reclassifica. Em caso de dúvida, sobe um nível. Isso evita que mudanças relevantes sejam classificadas como N1 para fugir de revisão.
      </p>
    </section>
  )
}
