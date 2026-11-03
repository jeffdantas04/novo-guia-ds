export function RoleCard({ title, who, items, highlight }) {
  return (
    <article style={{
      background: 'var(--surface)',
      border: `1px solid ${highlight ? 'var(--accent)' : 'var(--line)'}`,
      borderRadius: 'var(--r)',
      padding: 18,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {who && <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{who}</span>}
      {items && (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: '.9rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </article>
  )
}
