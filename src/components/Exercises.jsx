import { useState } from 'react'
import { formatLong, uid } from '../utils'

export default function Exercises({ exercises, setExercises, date, onSchedule }) {
  const [form, setForm] = useState({ name: '', group: '', minutes: 15 })
  const [time, setTime] = useState('18:00')
  const [msg, setMsg] = useState('')

  const add = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setExercises((p) => [...p, { id: uid(), ...form, name: form.name.trim(), minutes: Number(form.minutes) }])
    setForm({ name: '', group: '', minutes: 15 })
  }

  const schedule = (ex) => {
    onSchedule({ id: uid(), date, time, type: 'ejercicio', title: ex.name, minutes: ex.minutes, done: false })
    setMsg(`✔ "${ex.name}" agendado el ${formatLong(date)} a las ${time}`)
  }

  return (
    <section className="card">
      <h2>Ejercicios</h2>
      <p className="muted">
        Agenda para <b>{formatLong(date)}</b> (cámbialo en Calendario) a las{' '}
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </p>
      {msg && <p className="ok">{msg}</p>}

      <ul className="list">
        {exercises.map((ex) => (
          <li key={ex.id}>
            <span className="grow"><strong>{ex.name}</strong> <span className="muted">{ex.group} · {ex.minutes} min</span></span>
            <button onClick={() => schedule(ex)}>+ Agendar</button>
            <button className="ghost" onClick={() => setExercises((p) => p.filter((x) => x.id !== ex.id))} aria-label="Eliminar">✕</button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="form">
        <input placeholder="Nuevo ejercicio" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Grupo (Piernas...)" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} />
        <input type="number" min="1" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} title="Minutos" />
        <button type="submit">Crear</button>
      </form>
    </section>
  )
}
