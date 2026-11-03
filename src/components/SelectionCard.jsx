export function SelectionCard({ pressed, disabled, onClick, title, tag, desc }) {
  return (
    <button
      type="button"
      className="card"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="top">
        <b>{title}</b>
        {tag}
      </span>
      <small>{desc}</small>
    </button>
  )
}
