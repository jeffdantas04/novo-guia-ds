import { FormSummary } from '../../components/FormSummary.jsx'
import { MessagePreview, montarMensagemDisplay } from '../../components/MessagePreview.jsx'
import { LevelBadge } from '../../components/LevelBadge.jsx'

export function Step6Revisao({ state, r }) {
  if (!r) {
    return (
      <div className="panel-head">
        <span className="eyebrow">Etapa 6 · Revisão</span>
        <h2>Faltam tipo e escopo</h2>
      </div>
    )
  }

  const REQUIRED = [
    ['titulo', 'Nome'],
    ['problema', 'Problema'],
    ['existente', 'Por que o existente não atende'],
    ['nome', 'Seu nome'],
  ]
  const falta = REQUIRED.filter(([k]) => !state[k]).map(([, l]) => l)
  if (!r.t.foundation && !state.modo) falta.push('Modo')

  const msg = montarMensagemDisplay(state, r)

  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 6 · Revisão e envio</span>
        <h2>{state.titulo || 'Sem nome'}</h2>
        <p>Confira como sua contribuição vai seguir.</p>
      </div>

      {falta.length > 0 && (
        <div className="missing">
          Falta preencher:{' '}
          {falta.map(f => <span key={f} className="chip">{f}</span>)}
        </div>
      )}

      <FormSummary r={r} />
      <MessagePreview message={msg} />
    </>
  )
}
