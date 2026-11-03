import { STEPS } from '../config/regras.js'

export function Stepper({ step }) {
  return (
    <div className="stepper">
      {STEPS.map((label, i) => (
        <span key={i} className={i === step ? 'on' : i < step ? 'done' : ''}>
          {i + 1}. {label}
        </span>
      ))}
    </div>
  )
}
