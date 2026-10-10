import { useState } from 'react'
import { DAYS, uid } from '../utils'

const empty = { title: '', time: '07:00', minutes: 45, type: 'ejercicio', days: [0, 2, 4] }

export default function Routines({ routines, setRoutines }) {
  const [form, setForm] = useState(empty)

  const toggleDay = (d) =>
    setForm((f) => ({ ...f, days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d].sort() }))

  const add = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.days.length) return
    setRoutines((p) => [...p, { id: uid(), ...form, title: form.title.trim(), minutes: Number(form.minutes) }])
    setForm({ ...empty, days: form.days })
  }

  return (
    <section className="card">
      <h2>Rutinas semanales</h2>
      <p className="muted">Se repiten solas cada semana en los días elegidos y aparecen en el Calendario.</p>

      <ul className="list">
        {routines.length === 0 && <li className="muted">Aún no tienes rutinas.</li>}
        {routines.map((r) => (
          <li key={r.id}>
            <strong>{r.time}</strong>
            <span className="grow">
              {r.type === 'ejercicio' ? '🏋️' : '🍽️'} {r.title}
              <span className="muted"> · {r.days.map((d) => DAYS[d]).join(', ')}</span>
            </span>
            <button className="ghost" onClick={() => setRoutines((p) => p.filter((x) => x.id !== r.id))} aria-label="Eliminar">✕</button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="form">
        <input placeholder="Ej: Pierna y glúteo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="ejercicio">Ejercicio</option>
          <option value="comida">Comida</option>
        </select>
        {form.type === 'ejercicio' && (
          <input type="number" min="1" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} title="Minutos" />
        )}
        <div className="days">
          {DAYS.map((d, i) => (
            <button type="button" key={d} className={form.days.includes(i) ? 'on' : ''} onClick={() => toggleDay(i)}>{d}</button>
          ))}
        </div>
        <button type="submit">Crear rutina</button>
      </form>
    </section>
  )
}
