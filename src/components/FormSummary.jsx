import { LevelBadge } from './LevelBadge.jsx'

export function FormSummary({ r }) {
  return (
    <div className="summary">
      <div><span className="eyebrow">Prioridade</span><b>{r.t.p} · {r.t.nome}</b></div>
      <div><span className="eyebrow">Nível</span><b><LevelBadge nivel={r.nivel} /></b></div>
      <div><span className="eyebrow">Prazo de validação</span><b className="mono">{r.prazo}</b></div>
      <div><span className="eyebrow">Quem constrói</span><b>{r.construtor}</b></div>
      <div><span className="eyebrow">Quem valida</span><b>{r.valida}</b></div>
      <div><span className="eyebrow">Próximo passo</span><b>{r.destino}</b></div>
    </div>
  )
}
