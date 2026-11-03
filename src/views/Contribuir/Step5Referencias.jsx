import { FormField } from '../../components/FormField.jsx'

export function Step5Referencias({ state, setField }) {
  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 5 · Referências</span>
        <h2>Contexto visual e aprovação</h2>
      </div>
      <FormField
        id="refs"
        label="Referências visuais"
        hint="Wireframes, telas atuais, benchmark."
        type="area"
        value={state.refs}
        onChange={v => setField('refs', v)}
      />
      <FormField
        id="aprovacao"
        label="Validação de produto"
        hint="Quem do produto concorda com a necessidade."
        value={state.aprovacao}
        onChange={v => setField('aprovacao', v)}
      />
    </>
  )
}
