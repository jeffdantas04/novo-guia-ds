import { useState } from 'react'
import { FormSummary } from '../../components/FormSummary.jsx'
import { MessagePreview, montarMensagemDisplay } from '../../components/MessagePreview.jsx'
import { AdoConfigPanel } from '../../components/AdoConfigPanel.jsx'
import { montarCamposADO } from '../../envio/adoFormato.js'

export function Step6Revisao({ state, r, adoConfig, setAdoConfig, adoConfigured }) {
  const [adoOpen, setAdoOpen] = useState(false)

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
  const adoCampos = montarCamposADO(state, r)

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

      {/* Teams */}
      <MessagePreview message={msg} />

      {/* Azure DevOps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--line)', paddingTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <span className="legend" style={{ fontWeight: 600, fontSize: '.9rem' }}>Azure DevOps</span>
            {adoConfigured && (
              <span style={{ marginLeft: 8, fontSize: '.8rem', color: 'var(--n1)' }}>✓ configurado</span>
            )}
          </div>
          <button
            type="button"
            className="btn"
            style={{ fontSize: '.82rem', padding: '6px 14px' }}
            onClick={() => setAdoOpen(o => !o)}
          >
            {adoOpen ? 'Fechar' : adoConfigured ? 'Editar configuração' : 'Configurar envio'}
          </button>
        </div>

        {adoOpen && (
          <AdoConfigPanel config={adoConfig} setConfig={setAdoConfig} isConfigured={adoConfigured} />
        )}

        {adoCampos && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="field">
              <span className="legend" style={{ fontSize: '.82rem' }}>Title</span>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--f-display)', fontWeight: 600 }}>
                {adoCampos.title}
              </div>
            </div>
            <div className="field">
              <span className="legend" style={{ fontSize: '.82rem' }}>Description</span>
              <pre className="msg" style={{ fontSize: '.78rem' }}>{
[`Problema:\n${state.problema || '-'}`,
`\nPor que o existente não atende:\n${state.existente || '-'}`,
`\nSuperfícies: ${state.superficies.join(', ') || '-'}`,
`Tokens: ${state.tokens || '-'}`,
`Referências: ${state.refs || '-'}`,
`Validação de produto: ${state.aprovacao || '-'}`,
].join('\n')
              }</pre>
            </div>
            <div className="row" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <span className="legend" style={{ fontSize: '.82rem' }}>Acceptance Criteria</span>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', fontSize: '.86rem' }}>
                  <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <li>Variantes documentadas</li>
                    <li>Estados completos</li>
                    <li>Tokens vinculados</li>
                    <li>WCAG 2.1 AA</li>
                    <li>Documentação de uso</li>
                  </ul>
                </div>
              </div>
              <div className="field">
                <span className="legend" style={{ fontSize: '.82rem' }}>Tags</span>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', fontSize: '.86rem', fontFamily: 'var(--f-mono)', lineHeight: 1.6 }}>
                  {adoCampos.tags}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
