import { FormField, SelectField } from '../../components/FormField.jsx'

const FRENTES = [
  { value: '', label: 'Selecione' },
  { value: 'App', label: 'App' },
  { value: 'Site', label: 'Site' },
  { value: 'PDV', label: 'PDV' },
  { value: 'Outra', label: 'Outra' },
]

export function Step2Identificacao({ state, setField }) {
  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 2 · Identificação</span>
        <h2>Quem está propondo</h2>
      </div>
      <div className="row">
        <FormField id="nome" label="Seu nome" value={state.nome} onChange={v => setField('nome', v)} />
        <SelectField id="frente" label="Sua frente" value={state.frente} onChange={v => setField('frente', v)} options={FRENTES} />
      </div>
      <FormField id="titulo" label="Nome da contribuição" hint="Como o item vai aparecer na biblioteca." value={state.titulo} onChange={v => setField('titulo', v)} />
    </>
  )
}
