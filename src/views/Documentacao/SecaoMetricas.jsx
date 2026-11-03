import { MetricCard } from '../../components/MetricCard.jsx'

const METRICS = [
  { value: '≥ 70%', label: 'das contribuições publicadas sem passar pelo DS owner', main: true },
  { value: '80%', label: 'das validações dentro do prazo' },
  { value: '≥ 60%', label: 'de aprovação na 1ª rodada de revisão' },
  { value: 'Queda', label: 'na taxa de reprovação na checagem automática' },
  { value: 'Alta', label: 'no número de contribuidores ativos por trimestre' },
  { value: 'Monitorar', label: 'itens no Banco de oportunidades há mais de 30 dias' },
  { value: '≤ 2', label: 'rollbacks por trimestre após auditoria amostral' },
]

export function SecaoMetricas() {
  return (
    <section className="section" id="s-metricas">
      <span className="eyebrow">Como medimos</span>
      <h2>Acompanhamento trimestral</h2>
      <div className="metrics">
        {METRICS.map((m, i) => (
          <MetricCard key={i} value={m.value} label={m.label} main={m.main} />
        ))}
      </div>
    </section>
  )
}
