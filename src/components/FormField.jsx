export function FormField({ id, label, hint, type = 'text', value, onChange, children }) {
  return (
    <div className="field">
      {label && <label htmlFor={`f-${id}`}>{label}</label>}
      {children && <span className="legend">{children}</span>}
      {hint && <span className="hint">{hint}</span>}
      {type === 'area' ? (
        <textarea id={`f-${id}`} value={value} onChange={e => onChange(e.target.value)} />
      ) : type === 'select' ? null : (
        <input type="text" id={`f-${id}`} value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  )
}

export function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className="field">
      <label htmlFor={`f-${id}`}>{label}</label>
      <select id={`f-${id}`} value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
