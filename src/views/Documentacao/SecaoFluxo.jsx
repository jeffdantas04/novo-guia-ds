import { FlowList } from '../../components/FlowList.jsx'

const FLUXO = [
  { titulo: 'Proposta', desc: 'Antes de construir, descreva o problema, mostre que nenhum componente existente resolve, indique os tokens e sugira o nível.' },
  { titulo: 'Proposta aprovada', desc: 'Um Guardião responde em até 2 dias úteis e confirma categoria e nível. Se faltar token, um P4 é aberto em paralelo.' },
  { titulo: 'Construção em branch', desc: 'Sempre numa branch do arquivo Components no Figma, nunca no main. Preencha o checklist de pronto antes de pedir revisão.' },
  { titulo: 'Checagem automática', desc: 'Tokens vinculados, nomenclatura, variantes, contraste e padrão de ícones. Se reprovar, volta direto para você.' },
  { titulo: 'Revisão', desc: 'Par, Guardião ou DS owner, conforme o nível.' },
  { titulo: 'Ajustes solicitados', desc: 'Até 2 rodadas. Na 3ª, escala ao Guardião responsável e, se persistir, ao DS owner. Conflito de prioridade segue para o Líder de Design.' },
  { titulo: 'Janela de objeção', desc: '3 dias úteis com o time testando. Para N1 e N2, sem objeção registrada, está aprovado.' },
  { titulo: 'Publicação', desc: 'Merge, versionamento, anúncio no canal Design System com crédito ao autor e entrada no changelog.' },
]

const STATUS = [
  { status: 'Proposta recebida', com: 'Guardião', prazo: 'Correndo (triagem)', run: true },
  { status: 'Aguardando informações', com: 'Contribuidor', prazo: 'Pausado', run: false },
  { status: 'Proposta aprovada', com: 'Contribuidor', prazo: 'Pausado', run: false },
  { status: 'Em construção', com: 'Contribuidor', prazo: 'Pausado', run: false },
  { status: 'Checagem automática', com: 'Sistema', prazo: 'Pausado', run: false },
  { status: 'Em revisão', com: 'Par, Guardião ou DS owner', prazo: 'Correndo', run: true },
  { status: 'Ajustes solicitados', com: 'Contribuidor', prazo: 'Pausado', run: false },
  { status: 'Janela de objeção', com: 'Time', prazo: '3 dias fixos', run: false },
  { status: 'Publicado', com: '', prazo: 'Finalizado', run: false },
  { status: 'Recusado', com: '', prazo: 'Finalizado, com justificativa', run: false },
  { status: 'Arquivado', com: '', prazo: '15 dias sem atividade do contribuidor', run: false },
]

export function SecaoFluxo() {
  return (
    <section className="section" id="s-fluxo">
      <span className="eyebrow">Fluxo e status</span>
      <h2>Da proposta à publicação</h2>
      <FlowList items={FLUXO} />
      <div className="tbl">
        <table>
          <thead>
            <tr><th>Status no Kanban</th><th>Com quem está</th><th>Prazo de validação</th></tr>
          </thead>
          <tbody>
            {STATUS.map((s, i) => (
              <tr key={i}>
                <td><span className="chip">{s.status}</span></td>
                <td>{s.com}</td>
                <td className={s.run ? 'run' : 'pause'}>{s.prazo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
