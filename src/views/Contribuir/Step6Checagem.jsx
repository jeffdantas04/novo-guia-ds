import { useState } from 'react'
import { executarChecagem } from '../../envio/figmaCheck.js'

const LABELS = {
  nomenclatura: 'Nomenclatura',
  variantes: 'Variantes documentadas',
  tokens: 'Tokens vinculados',
  icones: 'Padrão de ícones',
  contraste: 'Contraste WCAG 2.1 AA',
}

const STATUS_ICON = { pass: '✓', fail: '✗', warn: '⚠', skip: '–' }
const STATUS_COLOR = {
  pass: 'var(--n1)',
  fail: 'var(--red, #d13030)',
  warn: 'var(--warn, #b87c00)',
  skip: 'var(--muted)',
}

export function Step6Checagem({ figmaConfig, setFigmaConfig, savedResult, onResult }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const result = savedResult

  async function run() {
    setLoading(true)
    setError(null)
    try {
      const r = await executarChecagem(figmaConfig.fileUrl, figmaConfig.pat)
      onResult(r)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const configured = !!(figmaConfig.pat && figmaConfig.fileUrl)

  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 6 · Checagem automática</span>
        <h2>Auditoria da branch antes da revisão</h2>
        <p>O portal busca os dados da sua branch no Figma e verifica nomenclatura, variantes, tokens vinculados, padrão de ícones e contraste. Execute antes de pedir revisão ao Guardião.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label htmlFor="fig-url">Link da branch no Figma</label>
          <span className="hint">URL completa — se estiver numa branch, o link já inclui <code>branch-id=</code></span>
          <input
            type="text"
            id="fig-url"
            placeholder="https://www.figma.com/design/..."
            value={figmaConfig.fileUrl}
            onChange={e => setFigmaConfig({ fileUrl: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="fig-pat">Personal Access Token do Figma</label>
          <span className="hint">
            Permissão <b>Read only</b> em arquivos.{' '}
            <a href="https://help.figma.com/hc/en-us/articles/8085703771159" target="_blank" rel="noopener noreferrer">Como gerar →</a>
          </span>
          <input
            type="password"
            id="fig-pat"
            placeholder="figd_••••••••••••••••••••••"
            value={figmaConfig.pat}
            onChange={e => setFigmaConfig({ pat: e.target.value })}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn primary"
        disabled={!configured || loading}
        onClick={run}
        style={{ alignSelf: 'flex-start' }}
      >
        {loading ? 'Verificando…' : result ? 'Executar novamente' : 'Executar checagem'}
      </button>

      {error && (
        <div className="missing" style={{ padding: '12px 14px', borderRadius: 8 }}>
          Erro: {error}
        </div>
      )}

      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="note" style={{ margin: 0 }}>
            Arquivo: <strong>{result.fileName}</strong> · última modificação:{' '}
            {new Date(result.lastModified).toLocaleString('pt-BR')}
          </p>

          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '38%' }}>Critério</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.checks).map(([key, check]) => (
                  <tr key={key}>
                    <td style={{ fontWeight: 600, color: STATUS_COLOR[check.status] }}>
                      {STATUS_ICON[check.status]} {LABELS[key]}
                    </td>
                    <td>
                      <span style={{ color: STATUS_COLOR[check.status] }}>{check.msg}</span>
                      {check.items?.length > 0 && (
                        <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: '.82rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {check.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {Object.values(result.checks).every(c => c.status === 'pass' || c.status === 'skip') ? (
            <p className="note" style={{ margin: 0, color: STATUS_COLOR.pass }}>
              ✓ Todas as checagens aprovadas. Avance para Revisão e envio.
            </p>
          ) : (
            <p className="note" style={{ margin: 0 }}>
              Corrija os itens marcados com ✗ ou ⚠ antes de pedir revisão ao Guardião. Você ainda pode avançar para revisar o envio.
            </p>
          )}
        </div>
      )}

      {!result && !error && (
        <p className="note" style={{ margin: 0 }}>
          Esta etapa é opcional. Avance para Revisão e envio se preferir pular.
        </p>
      )}
    </>
  )
}
