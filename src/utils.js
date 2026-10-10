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
