export function FlowList({ items }) {
  return (
    <ol className="flow" style={{
      padding: 0, margin: 0,
      display: 'flex', flexDirection: 'column', gap: 0,
      counterReset: 'f',
    }}>
      {items.map((item, i) => (
        <li key={i} style={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: '36px minmax(0,1fr)',
          gap: 14,
          position: 'relative',
          paddingBottom: 18,
          counterIncrement: 'f',
        }}>
          <span aria-hidden="true" style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--surface)', border: '1.5px solid var(--accent)',
            color: 'var(--accent)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--f-mono)', fontSize: '.78rem',
            flexShrink: 0,
          }}>{i + 1}</span>
          {i < items.length - 1 && (
            <span aria-hidden="true" style={{
              position: 'absolute', left: 13.5, top: 30, bottom: 2,
              width: 1, background: 'var(--line)',
            }} />
          )}
          <div>
            <b style={{ display: 'block', fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: '.95rem' }}>{item.titulo}</b>
            <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{item.desc}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}
