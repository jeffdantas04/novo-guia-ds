import { useEffect, useRef } from 'react'

export function Toast({ message, onHide }) {
  const timerRef = useRef(null)

  useEffect(() => {
    if (!message) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(onHide, 3200)
    return () => clearTimeout(timerRef.current)
  }, [message, onHide])

  if (!message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}
