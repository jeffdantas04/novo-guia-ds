import { TIPOS, NIVEL } from '../../config/regras.js'
import { SelectionCard } from '../../components/SelectionCard.jsx'
import { FormField } from '../../components/FormField.jsx'
import { LevelBadge } from '../../components/LevelBadge.jsx'

export function Step4Detalhes({ state, setNivel, setField, r }) {
  if (!r) {
    return (
      <div className="panel-head">
        <span className="eyebrow">Etapa 4 · Detalhes</span>
        <h2>Escolha o tipo primeiro</h2>
        <p>Volte à etapa 1 para definir tipo e escopo.</p>
      </div>
    )
  }

  const t = TIPOS[state.tipo]

  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 4 · Detalhes</span>
        <h2>Nível e construção</h2>
      </div>

      <div className="field">
        <span className="legend">Nível sugerido</span>
        <div className="cards">
          {[1, 2, 3].map(n => (
            <SelectionCard
              key={n}
              pressed={r.nivel === n}
              disabled={n < r.base}
              onClick={() => setNivel(n)}
              title={NIVEL[n]}
              tag={null}
              desc={
                n < r.base
                  ? 'Abaixo do padrão deste tipo'
                  : n === r.base
                  ? `Padrão para ${r.sub.nome}`
                  : 'Use se a mudança tiver mais impacto que o padrão'
              }
            />
          ))}
        </div>
        <span className="hint">O Guardião confirma ou reclassifica. Na dúvida, suba um nível.</span>
      </div>

      <FormField
        id="tokens"
        label="Tokens que serão usados"
        hint="Liste os tokens do Foundation. Se faltar algum, ele será aberto como P4 em paralelo."
        type="area"
        value={state.tokens}
        onChange={v => setField('tokens', v)}
      />

      {state.modo === 'construir' && !t.foundation && (
        <FormField
          id="branch"
          label="Link da branch no Figma"
          hint="Pode ser preenchido depois da aprovação da proposta."
          value={state.branch}
          onChange={v => setField('branch', v)}
        />
      )}
    </>
  )
}
