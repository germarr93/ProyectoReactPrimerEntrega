import { useState } from 'react'
import { dayItems, formatLong, uid } from '../utils'

export default function Agenda({ date, events, routines, routineDone, onAdd, onToggle, onToggleRoutine, onRemove }) {
  const [form, setForm] = useState({ time: '08:00', type: 'ejercicio', title: '', minutes: 30 })
  const day = dayItems(date, events, routines, routineDone)
  const done = day.filter((e) => e.done).length

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({ id: uid(), date, ...form, title: form.title.trim(), minutes: Number(form.minutes), done: false })
    setForm({ ...form, title: '' })
  }

  return (
    <section className="card">
      <h2 className="cap">{formatLong(date)}</h2>
      <p className="muted">{day.length ? `${done}/${day.length} completadas` : 'Sin actividades. ¡Agrega una!'}</p>

      <ul className="list">
        {day.map((e) => (
          <li key={e.id + (e.fromRoutine ? 'r' : '')} className={e.done ? 'done' : ''}>
            <input type="checkbox" checked={e.done} onChange={() => (e.fromRoutine ? onToggleRoutine(e.id, date) : onToggle(e.id))} />
            <strong>{e.time}</strong>
            <span className={`tag ${e.type}`}>{e.type === 'ejercicio' ? '🏋️' : '🍽️'}</span>
            <span className="grow">{e.title}{e.fromRoutine && ' 🔁'}{e.type === 'ejercicio' && ` · ${e.minutes} min`}</span>
            {!e.fromRoutine && (
              <button className="ghost" onClick={() => onRemove(e.id)} aria-label="Eliminar">✕</button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="form">
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="ejercicio">Ejercicio</option>
          <option value="comida">Comida</option>
        </select>
        <input
          placeholder="Ej: Pecho y tríceps / Desayuno"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {form.type === 'ejercicio' && (
          <input type="number" min="1" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} title="Minutos" />
        )}
        <button type="submit">Agregar</button>
      </form>
    </section>
  )
}
