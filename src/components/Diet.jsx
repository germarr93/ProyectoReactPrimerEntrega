import { useState } from 'react'
import { formatLong, uid } from '../utils'

export default function Diet({ rules, setRules, date, checked, onCheck }) {
  const [text, setText] = useState('')
  const pct = rules.length ? Math.round((checked.length / rules.length) * 100) : 0

  const add = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setRules((p) => [...p, { id: uid(), text: text.trim() }])
    setText('')
  }

  return (
    <section className="card">
      <h2>Reglas de dieta</h2>
      <p className="muted">Cumplimiento de <b>{formatLong(date)}</b>: {checked.length}/{rules.length}</p>
      <div className="bar"><div style={{ width: `${pct}%` }} /></div>

      <ul className="list">
        {rules.map((r) => (
          <li key={r.id} className={checked.includes(r.id) ? 'done' : ''}>
            <input type="checkbox" checked={checked.includes(r.id)} onChange={() => onCheck(r.id)} />
            <span className="grow">{r.text}</span>
            <button className="ghost" onClick={() => setRules((p) => p.filter((x) => x.id !== r.id))} aria-label="Eliminar">✕</button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="form">
        <input placeholder="Nueva regla (ej: Sin pan en la cena)" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>
    </section>
  )
}
