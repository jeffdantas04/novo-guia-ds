import { DOC_NAV, STEPS } from '../../config/regras.js'

export function Sidebar({ view, step, onView, onScroll, onStep, themeLabel, onThemeCycle }) {
  const isDoc = view === 'documentacao'

  return (
    <aside style={{
      background: 'var(--side-bg)',
      color: 'var(--side-fg)',
      position: 'sticky', top: 0,
      height: '100vh',
      display: 'flex', flexDirection: 'column', gap: 22,
      padding: '24px 18px',
      borderRight: '1px solid var(--side-line)',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <strong style={{ fontFamily: 'var(--f-display)', fontSize: '1.02rem' }}>C&A Design System</strong>
        <span style={{ fontSize: '.8rem', color: 'var(--side-muted)' }}>v3.0 · Contribuição</span>
      </div>

      <div role="tablist" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
        background: 'var(--side-active)', padding: 4, borderRadius: 9,
      }}>
        {[['documentacao', 'Documentação'], ['contribuir', 'Contribuir']].map(([v, label]) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            aria-current={view === v ? 'page' : undefined}
            onClick={() => onView(v)}
            style={{
              border: 0,
              background: view === v ? 'var(--side-fg)' : 'transparent',
              color: view === v ? 'var(--side-bg)' : 'var(--side-muted)',
              padding: '8px 6px', borderRadius: 6,
              fontSize: '.85rem', fontWeight: 600,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <nav aria-label={isDoc ? 'Seções do documento' : 'Etapas do formulário'} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span className="eyebrow" style={{ color: 'var(--side-muted)', margin: '0 8px 6px' }}>
          {isDoc ? 'Documento' : `Etapas · ${step + 1} de ${STEPS.length}`}
        </span>

        {isDoc
          ? DOC_NAV.map(([id, label]) => (
            <button
              key={id}
              onClick={() => onScroll(id)}
              style={{
                display: 'flex', gap: 10, alignItems: 'center',
                textAlign: 'left', border: 0,
                background: 'transparent',
                color: 'var(--side-fg)',
                padding: '7px 10px', borderRadius: 7,
                fontSize: '.88rem', opacity: .82,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--side-active)'; e.currentTarget.style.opacity = 1 }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = .82 }}
            >
              {label}
            </button>
          ))
          : STEPS.map((label, i) => {
            const isOn = i === step
            const isDone = i < step
            return (
              <button
                key={i}
                onClick={() => onStep(i)}
                aria-current={isOn ? 'step' : undefined}
                style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  textAlign: 'left', border: 0,
                  background: isOn ? 'var(--side-active)' : 'transparent',
                  color: 'var(--side-fg)',
                  padding: '7px 10px', borderRadius: 7,
                  fontSize: '.88rem', opacity: isOn ? 1 : .82,
                }}
              >
                <span style={{
                  fontFamily: 'var(--f-mono)', fontSize: '.7rem',
                  color: isDone ? 'var(--n1)' : 'var(--side-muted)',
                  width: 20,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </button>
            )
          })
        }
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={onThemeCycle}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: '1px solid var(--side-line)', background: 'transparent',
            color: 'var(--side-fg)', borderRadius: 8, padding: '9px 12px', fontSize: '.84rem',
          }}
        >
          <span>Tema</span>
          <span className="mono">{themeLabel}</span>
        </button>
        <small style={{ color: 'var(--side-muted)', fontSize: '.74rem', lineHeight: 1.4 }}>
          Protótipo para validação com a Liderança de Design. Envios não são gravados.
        </small>
      </div>
    </aside>
  )
}
