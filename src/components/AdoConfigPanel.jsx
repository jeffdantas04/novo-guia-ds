const WORK_ITEM_TYPES = ['User Story', 'Task', 'Bug', 'Feature', 'Epic']

export function AdoConfigPanel({ config, setConfig, isConfigured }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="field">
          <label htmlFor="ado-org">Organização</label>
          <span className="hint">dev.azure.com/<b>org</b></span>
          <input
            type="text"
            id="ado-org"
            placeholder="minha-org"
            value={config.org}
            onChange={e => setConfig({ org: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="ado-project">Projeto</label>
          <span className="hint">Nome do projeto no ADO</span>
          <input
            type="text"
            id="ado-project"
            placeholder="DesignSystem"
            value={config.project}
            onChange={e => setConfig({ project: e.target.value })}
          />
        </div>
      </div>

      <div className="row" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="field">
          <label htmlFor="ado-pat">Personal Access Token (PAT)</label>
          <span className="hint">
            Precisa de permissão <b>Work Items · Read &amp; write</b>.{' '}
            <a href="https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate" target="_blank" rel="noopener noreferrer">Como gerar</a>
          </span>
          <input
            type="password"
            id="ado-pat"
            placeholder="••••••••••••••••••••••"
            value={config.pat}
            onChange={e => setConfig({ pat: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="ado-type">Tipo de work item</label>
          <span className="hint">&nbsp;</span>
          <select
            id="ado-type"
            value={config.workItemType}
            onChange={e => setConfig({ workItemType: e.target.value })}
          >
            {WORK_ITEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {isConfigured && (
        <p className="note" style={{ margin: 0 }}>
          ✓ Configurado: <strong>{config.org}</strong> / <strong>{config.project}</strong> · tipo <strong>{config.workItemType}</strong>
        </p>
      )}
    </div>
  )
}
