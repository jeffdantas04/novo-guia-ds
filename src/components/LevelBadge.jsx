export function LevelBadge({ nivel }) {
  return (
    <span className={`lvl lvl-${nivel}`} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--f-mono)', fontSize: '.74rem', fontWeight: 500,
      padding: '2px 9px', borderRadius: 999, whiteSpace: 'nowrap',
      background: `var(--n${nivel}-soft)`, color: `var(--n${nivel})`,
    }}>
      N{nivel} · {{ 1: 'Baixo', 2: 'Médio', 3: 'Alto' }[nivel]}
    </span>
  )
}
