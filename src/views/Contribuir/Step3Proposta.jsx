import { FormField } from '../../components/FormField.jsx'
import { PillGroup } from '../../components/PillGroup.jsx'

export function Step3Proposta({ state, setField, toggleSuperficie }) {
  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 3 · Proposta</span>
        <h2>Por que isso precisa existir</h2>
        <p>É isso que o Guardião avalia antes de qualquer construção.</p>
      </div>
      <FormField
        id="problema"
        label="Qual problema resolve"
        hint="Descreva o cenário real, não a solução."
        type="area"
        value={state.problema}
        onChange={v => setField('problema', v)}
      />
      <FormField
        id="existente"
        label="Por que o que já existe não atende"
        hint="Cite o componente que você testou e o requisito em que ele falha."
        type="area"
        value={state.existente}
        onChange={v => setField('existente', v)}
      />
      <PillGroup
        options={['App', 'Site', 'PDV']}
        selected={state.superficies}
        onToggle={toggleSuperficie}
        hint="Usado em 2 ou mais superfícies, vai direto para o core. Em uma só, considere começar na biblioteca local da frente."
      />
    </>
  )
}
