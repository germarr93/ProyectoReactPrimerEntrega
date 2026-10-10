import { useEffect, useState } from 'react'

// Igual que useState, pero guarda el valor en el navegador (localStorage).
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // sin almacenamiento: la app sigue funcionando sin guardar
    }
  }, [key, value])
  return [value, setValue]
}
