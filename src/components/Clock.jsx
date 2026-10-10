import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="clock" aria-label="Reloj">
      <strong>{now.toLocaleTimeString('es-ES')}</strong>
      <span>{now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
    </div>
  )
}
