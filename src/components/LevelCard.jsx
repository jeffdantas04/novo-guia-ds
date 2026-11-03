import { LevelBadge } from './LevelBadge.jsx'

export function LevelCard({ nivel, badge, itens }) {
  return (
    <article className={`level n${nivel}`} style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--r)', padding: 18,
      display: 'flex', flexDirection: 'column', gap: 10,
      borderTop: `4px solid var(--n${nivel})`,
    }}>
      <LevelBadge nivel={nivel} />
      <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: '.9rem' }}>
        {itens.map(({ dt, dd }) => (
          <div key={dt}>
            <dt style={{ fontSize: '.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: 'var(--f-mono)', marginBottom: 2 }}>{dt}</dt>
            <dd style={{ margin: 0 }}>{dd}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
