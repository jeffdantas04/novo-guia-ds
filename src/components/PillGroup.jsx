export function PillGroup({ options, selected, onToggle, hint }) {
  return (
    <div className="field">
      <span className="legend">Superfícies</span>
      <div className="pills">
        {options.map(o => (
          <label key={o}>
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
            />
            {' '}{o}
          </label>
        ))}
      </div>
      {hint && <span className="hint">{hint}</span>}
    </div>
  )
}
