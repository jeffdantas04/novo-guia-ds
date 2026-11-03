const CANAIS = [
  { canal: 'Design System', uso: 'Propostas, dúvidas de uso e anúncios de publicação' },
  { canal: 'DS - Bugs', uso: 'Problemas em itens publicados. Entram como Correção P1' },
  { canal: 'DS - Changelog', uso: 'Versões publicadas, breaking changes e depreciações' },
  { canal: 'Chat direto', uso: 'Só para alinhamentos rápidos. Pedidos por chat direto não entram na fila' },
]

const FAQ = [
  { q: 'Não sei construir no Figma. Ainda posso pedir algo?', a: 'Pode. Escolha "Preciso que alguém construa" no formulário. Depois que a proposta for aprovada, ela vai para o Banco de oportunidades e outro designer pode adotá-la.' },
  { q: 'Por que não posso construir um token?', a: 'Tokens sustentam App, Site e PDV ao mesmo tempo. Você propõe o token e explica a necessidade; o DS owner ou o Guardião do Foundation constrói e mantém a escala consistente.' },
  { q: 'Posso classificar minha contribuição como N1 para ir mais rápido?', a: 'O nível é confirmado pelo Guardião e, na dúvida, sobe. Classificar abaixo do padrão só gera retrabalho quando a revisão pedir o nível correto.' },
  { q: 'E se ninguém objetar na janela de 3 dias?', a: 'Sem objeção registrada, a contribuição está aprovada e segue para publicação. Objeções precisam ser registradas no card ou na thread do canal.' },
  { q: 'Preciso do componente antes do prazo. O que faço?', a: 'Se for bloqueio de lançamento, peça fila preferencial ao Líder de Design. Fora disso, vale a ordem de prioridade.' },
  { q: 'O componente quebrou em produção. Qual o caminho?', a: 'Abra uma Correção P1 no canal DS - Bugs. Correções simples podem ser feitas por quem detectou e validadas por um par em até 1 dia útil.' },
]

export function SecaoFaq() {
  return (
    <section className="section" id="s-faq">
      <span className="eyebrow">Canais e dúvidas</span>
      <h2>Onde conversar</h2>
      <div className="tbl">
        <table>
          <thead>
            <tr><th>Canal no Teams</th><th>Uso</th></tr>
          </thead>
          <tbody>
            {CANAIS.map((c, i) => (
              <tr key={i}><td><b>{c.canal}</b></td><td>{c.uso}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {FAQ.map((f, i) => (
          <details key={i}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
