import { SecaoVisao } from './SecaoVisao.jsx'
import { SecaoNiveis } from './SecaoNiveis.jsx'
import { SecaoPrazos } from './SecaoPrazos.jsx'
import { SecaoCamadas } from './SecaoCamadas.jsx'
import { SecaoFluxo } from './SecaoFluxo.jsx'
import { SecaoPapeis } from './SecaoPapeis.jsx'
import { SecaoPronto } from './SecaoPronto.jsx'
import { SecaoKit } from './SecaoKit.jsx'
import { SecaoBanco } from './SecaoBanco.jsx'
import { SecaoLocal } from './SecaoLocal.jsx'
import { SecaoMetricas } from './SecaoMetricas.jsx'
import { SecaoFaq } from './SecaoFaq.jsx'

export function Documentacao() {
  return (
    <div className="wrap" id="view-documentacao">
      <header className="hero">
        <span className="proto">Proposta em validação</span>
        <span className="eyebrow">Governança · Documento de referência</span>
        <h1>Modelo de contribuição do Design System</h1>
        <p className="lead">Como qualquer designer da C&amp;A propõe, constrói e publica componentes, tokens e ícones no DS v3.0, com validação proporcional ao risco de cada mudança. Vale para App, Site e PDV.</p>
        <div className="meta">
          <div><span className="eyebrow">Versão</span><b>3.0</b></div>
          <div><span className="eyebrow">Status</span><b>Piloto N1 e N2</b></div>
          <div><span className="eyebrow">Revisão</span><b>Trimestral</b></div>
        </div>
      </header>
      <SecaoVisao />
      <SecaoNiveis />
      <SecaoPrazos />
      <SecaoCamadas />
      <SecaoFluxo />
      <SecaoPapeis />
      <SecaoPronto />
      <SecaoKit />
      <SecaoBanco />
      <SecaoLocal />
      <SecaoMetricas />
      <SecaoFaq />
      <p className="foot">C&amp;A Design System · v3.0 · Mantido por Jeff Dantas · Proposta de modelo de contribuição, nov 2026</p>
    </div>
  )
}
