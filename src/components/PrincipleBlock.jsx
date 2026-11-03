export function PrincipleBlock({ title, children }) {
  return (
    <div className="principle" style={{
      borderLeft: '3px solid var(--accent)',
      background: 'var(--surface)',
      padding: '18px 22px',
      borderRadius: '0 var(--r) var(--r) 0',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <h3>{title}</h3>
      <p style={{ color: 'var(--muted)' }}>{children}</p>
    </div>
  )
}
