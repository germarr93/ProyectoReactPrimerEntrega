export const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// Fecha -> "2026-10-10" (hora local, no UTC)
export const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const fromKey = (k) => {
  const [y, m, d] = k.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const formatLong = (k) =>
  fromKey(k).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

// Celdas del mes (empieza en lunes); null = hueco
export function monthCells(year, month) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const total = new Date(year, month + 1, 0).getDate()
  const cells = Array(offset).fill(null)
  for (let d = 1; d <= total; d++) cells.push(toKey(new Date(year, month, d)))
  return cells
}

// Lunes = 0 ... Domingo = 6
export const weekday = (k) => (fromKey(k).getDay() + 6) % 7

// Actividades de un día: eventos sueltos + rutinas semanales que caen ese día
export function dayItems(date, events, routines, routineDone) {
  const wd = weekday(date)
  const single = events.filter((e) => e.date === date)
  const repeated = routines
    .filter((r) => r.days.includes(wd))
    .map((r) => ({ ...r, date, fromRoutine: true, done: (routineDone[date] || []).includes(r.id) }))
  return [...single, ...repeated].sort((a, b) => a.time.localeCompare(b.time))
}
