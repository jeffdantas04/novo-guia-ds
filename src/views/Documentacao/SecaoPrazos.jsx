import { LevelBadge } from '../../components/LevelBadge.jsx'

export function SecaoPrazos() {
  const rows = [
    { tipo: 'Correção', p: 'P1', nivelEl: <><LevelBadge nivel={1} /> <span className="lock">N3 se breaking</span></>, construtor: 'Quem detectou', valida: 'Automático + par', prazo: '≤ 1 dia' },
    { tipo: 'Ajuste de token', p: 'P2', nivelEl: <LevelBadge nivel={3} />, construtor: 'DS owner ou Guardião do Foundation', valida: 'DS owner ou Guardião do Foundation', prazo: '≤ 3 dias' },
    { tipo: 'Componente Atom', p: 'P3', nivelEl: <LevelBadge nivel={2} />, construtor: 'Contribuidor', valida: 'Guardião', prazo: '2 dias' },
    { tipo: 'Componente Molecule', p: 'P3', nivelEl: <LevelBadge nivel={2} />, construtor: 'Contribuidor', valida: 'Guardião', prazo: '4 dias' },
    { tipo: 'Componente Organism', p: 'P3', nivelEl: <LevelBadge nivel={3} />, construtor: 'Contribuidor', valida: 'Guardião + DS owner', prazo: '7 dias' },
    { tipo: 'Token novo', p: 'P4', nivelEl: <LevelBadge nivel={3} />, construtor: 'DS owner ou Guardião do Foundation. O contribuidor propõe', valida: 'DS owner', prazo: '5 a 8 dias' },
    { tipo: 'Ícone individual', p: 'P5', nivelEl: <LevelBadge nivel={1} />, construtor: 'Contribuidor', valida: 'Par', prazo: '1 dia' },
    { tipo: 'Set de ícones', p: 'P5', nivelEl: <LevelBadge nivel={2} />, construtor: 'Contribuidor', valida: 'Guardião', prazo: '3 dias' },
  ]

  return (
    <section className="section" id="s-prazos">
      <span className="eyebrow">Tipos e prazos</span>
      <h2>Cinco tipos, filas paralelas</h2>
      <p>A prioridade define a ordem dentro de cada fila. P1 interrompe tudo, P2 entra no próximo slot e P3 a P5 seguem ordem de chegada. Os prazos contam em dias úteis, a partir da entrada em revisão.</p>
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Tipo</th><th>Prioridade</th><th>Nível</th>
              <th>Quem constrói</th><th>Quem valida</th><th>Validação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.tipo}</td>
                <td><span className="pri">{r.p}</span></td>
                <td>{r.nivelEl}</td>
                <td>{r.construtor}</td>
                <td>{r.valida}</td>
                <td className="mono">{r.prazo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        O Foundation é fechado para construção aberta. Tokens são a base de App, Site e PDV, e um erro nessa camada se espalha pelo sistema inteiro. Qualquer pessoa pode propor um token; a construção fica com o DS owner ou com o Guardião do Foundation, que tem escopo limitado (por exemplo, aprovar tokens semânticos que apontam para primitivos já existentes).
      </p>
    </section>
  )
}
