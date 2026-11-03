export function SecaoLocal() {
  return (
    <section className="section" id="s-local">
      <span className="eyebrow">Local antes de global</span>
      <h2>Nem tudo precisa entrar no core</h2>
      <p>Um componente pode nascer na biblioteca local da frente e ser promovido ao DS quando for usado em 2 ou mais contextos (App, Site, PDV). Isso protege o core de componentes muito específicos e reduz o volume de validação.</p>
    </section>
  )
}
