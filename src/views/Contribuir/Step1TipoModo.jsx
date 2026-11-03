import { TIPOS } from '../../config/regras.js'
import { SelectionCard } from '../../components/SelectionCard.jsx'
import { LevelBadge } from '../../components/LevelBadge.jsx'

export function Step1TipoModo({ state, setTipo, setSub, setModo }) {
  const t = TIPOS[state.tipo]

  return (
    <>
      <div className="panel-head">
        <span className="eyebrow">Etapa 1 · Tipo e modo</span>
        <h2>O que você quer trazer para o DS?</h2>
        <p>O tipo define a prioridade e o nível de validação. O modo define quem constrói.</p>
      </div>

      <div className="field">
        <span className="legend">Tipo</span>
        <div className="cards">
          {Object.entries(TIPOS).map(([k, v]) => (
            <SelectionCard
              key={k}
              pressed={state.tipo === k}
              onClick={() => setTipo(k)}
              title={v.nome}
              tag={<span className="pri">{v.p}</span>}
              desc={v.desc}
            />
          ))}
        </div>
      </div>

      {t && (
        <>
          <div className="field">
            <span className="legend">Escopo</span>
            <div className="cards">
              {Object.entries(t.subs).map(([k, v]) => (
                <SelectionCard
                  key={k}
                  pressed={state.sub === k}
                  onClick={() => setSub(k)}
                  title={v.nome}
                  tag={<LevelBadge nivel={v.nivel} />}
                  desc={v.desc}
                />
              ))}
            </div>
          </div>

          <div className="field">
            <span className="legend">Modo</span>
            {t.foundation ? (
              <p className="blocked">O Foundation é fechado para construção aberta. Sua proposta segue para o DS owner ou para o Guardião do Foundation, que constroem o token.</p>
            ) : (
              <div className="cards">
                <SelectionCard
                  pressed={state.modo === 'construir'}
                  onClick={() => setModo('construir')}
                  title="Vou construir"
                  tag={null}
                  desc="Você constrói em uma branch do Figma depois que a proposta for aprovada."
                />
                <SelectionCard
                  pressed={state.modo === 'adotar'}
                  onClick={() => setModo('adotar')}
                  title="Preciso que alguém construa"
                  tag={null}
                  desc="A proposta aprovada vai para o Banco de oportunidades, onde outro designer pode adotá-la."
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
