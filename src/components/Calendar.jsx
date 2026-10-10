import { useState } from 'react'
import { DAYS, fromKey, monthCells, toKey } from '../utils'

export default function Calendar({ events, selected, onSelect }) {
  const sel = fromKey(selected)
  const [view, setView] = useState({ y: sel.getFullYear(), m: sel.getMonth() })
  const [today] = useState(() => toKey(new Date()))

  const move = (delta) => {
    const d = new Date(view.y, view.m + delta, 1)
    setView({ y: d.getFullYear(), m: d.getMonth() })
  }
  const title = new Date(view.y, view.m, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return (
    <section className="card">
      <div className="cal-head">
        <button onClick={() => move(-1)} aria-label="Mes anterior">‹</button>
        <h2>{title}</h2>
        <button onClick={() => move(1)} aria-label="Mes siguiente">›</button>
      </div>
      <div className="cal-grid">
        {DAYS.map((d) => (
          <div key={d} className="cal-dow">{d}</div>
        ))}
        {monthCells(view.y, view.m).map((k, i) => {
          if (!k) return <div key={i} />
          const dayEvents = events.filter((e) => e.date === k)
          const cls = ['cal-day', k === selected && 'selected', k === today && 'today'].filter(Boolean).join(' ')
          return (
            <button key={k} className={cls} onClick={() => onSelect(k)}>
              {Number(k.slice(8))}
              <span className="dots">
                {dayEvents.slice(0, 4).map((e) => (
                  <i key={e.id} className={e.type} />
                ))}
              </span>
            </button>
          )
        })}
      </div>
      <p className="legend"><i className="ejercicio" /> Ejercicio &nbsp; <i className="comida" /> Comida</p>
    </section>
  )
}
