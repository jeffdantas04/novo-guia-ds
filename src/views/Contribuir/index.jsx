import { STEPS } from '../../config/regras.js'
import { calcularRegras } from '../../config/regras.js'
import { Stepper } from '../../components/Stepper.jsx'
import { Step1TipoModo } from './Step1TipoModo.jsx'
import { Step2Identificacao } from './Step2Identificacao.jsx'
import { Step3Proposta } from './Step3Proposta.jsx'
import { Step4Detalhes } from './Step4Detalhes.jsx'
import { Step5Referencias } from './Step5Referencias.jsx'
import { Step6Revisao } from './Step6Revisao.jsx'
import { montarMensagemDisplay } from '../../components/MessagePreview.jsx'

export function Contribuir({ formState, onToast }) {
  const { state, setTipo, setSub, setModo, setNivel, setField, toggleSuperficie, goStep, limpar } = formState
  const r = calcularRegras(state)
  const last = state.step === STEPS.length - 1

  function handleCopiar() {
    const txt = montarMensagemDisplay(state, r)
    const fallback = () => {
      onToast('Texto não pôde ser copiado automaticamente. Selecione e use Ctrl+C.')
    }
    try {
      navigator.clipboard.writeText(txt).then(() => onToast('Mensagem copiada'), fallback)
    } catch {
      fallback()
    }
  }

  function handleEnviar() {
    onToast('Protótipo: no portal publicado, o envio cria o card no Kanban do Notion.')
  }

  function renderStep() {
    switch (state.step) {
      case 0: return <Step1TipoModo state={state} setTipo={setTipo} setSub={setSub} setModo={setModo} />
      case 1: return <Step2Identificacao state={state} setField={setField} />
      case 2: return <Step3Proposta state={state} setField={setField} toggleSuperficie={toggleSuperficie} />
      case 3: return <Step4Detalhes state={state} setNivel={setNivel} setField={setField} r={r} />
      case 4: return <Step5Referencias state={state} setField={setField} />
      case 5: return <Step6Revisao state={state} r={r} />
      default: return null
    }
  }

  return (
    <div className="wrap" id="view-contribuir">
      <header className="hero">
        <span className="eyebrow">Nova contribuição</span>
        <h1>Propor ou construir</h1>
        <p className="lead">Seu progresso fica salvo neste navegador. No final você copia a mensagem para o canal Design System no Teams; no portal publicado, o envio também cria o card no Kanban.</p>
      </header>

      <Stepper step={state.step} />

      <div className="panel">
        {state.exemplo && (
          <div className="example">
            <span>Exemplo preenchido para demonstração. Nada aqui é uma demanda real.</span>
            <button type="button" onClick={limpar}>Começar do zero</button>
          </div>
        )}

        {renderStep()}

        <div className="actions">
          <button
            type="button"
            className="btn"
            disabled={state.step === 0}
            onClick={() => goStep(state.step - 1)}
          >
            Voltar
          </button>
          {last ? (
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="button" className="btn" onClick={handleCopiar}>Copiar mensagem</button>
              {/* Enviar proposta: desabilitado no protótipo — integração Notion Kanban a implementar */}
              <button type="button" className="btn primary" disabled onClick={handleEnviar}>Enviar proposta</button>
            </span>
          ) : (
            <button
              type="button"
              className="btn primary"
              onClick={() => { goStep(state.step + 1); window.scrollTo(0, 0) }}
            >
              Avançar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
