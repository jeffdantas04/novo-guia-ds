export function MetricCard({ value, label, main }) {
  return (
    <div style={{
      background: main ? 'var(--accent-soft)' : 'var(--surface)',
      border: main ? 'none' : '1px solid var(--line)',
      borderRadius: 'var(--r)',
      padding: 16,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <b style={{
        fontFamily: 'var(--f-display)',
        fontSize: '1.5rem', fontWeight: 700,
        color: main ? 'var(--accent)' : 'inherit',
      }}>{value}</b>
      <span style={{ fontSize: '.86rem', color: 'var(--muted)' }}>{label}</span>
    </div>
  )
}
