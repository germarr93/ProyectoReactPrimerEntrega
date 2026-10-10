import { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { DEFAULT_EXERCISES, DEFAULT_RULES } from './data'
import { toKey } from './utils'
import Calendar from './components/Calendar'
import Agenda from './components/Agenda'
import Exercises from './components/Exercises'
import Diet from './components/Diet'
import Routines from './components/Routines'
import Clock from './components/Clock'

const TABS = ['Calendario', 'Rutinas', 'Ejercicios', 'Dieta']

export default function App() {
  const [tab, setTab] = useState('Calendario')
  const [selected, setSelected] = useState(() => toKey(new Date()))
  // Todo se guarda en el navegador
  const [events, setEvents] = useLocalStorage('fit-events', []) // {id,date,time,type,title,minutes,done}
  const [exercises, setExercises] = useLocalStorage('fit-exercises', DEFAULT_EXERCISES)
  const [rules, setRules] = useLocalStorage('fit-rules', DEFAULT_RULES)
  const [routines, setRoutines] = useLocalStorage('fit-routines', []) // {id,days,time,type,title,minutes}
  const [routineDone, setRoutineDone] = useLocalStorage('fit-routine-done', {}) // { fecha: [idRutina] }
  const [checks, setChecks] = useLocalStorage('fit-checks', {}) // { fecha: [idRegla,...] }

  const addEvent = (ev) => setEvents((prev) => [...prev, ev])
  const toggleEvent = (id) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, done: !e.done } : e)))
  const removeEvent = (id) => setEvents((prev) => prev.filter((e) => e.id !== id))

  const toggleRoutine = (id, date) =>
    setRoutineDone((prev) => {
      const cur = prev[date] || []
      return { ...prev, [date]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] }
    })

  return (
    <div className="app">
      <header>
        <h1>💪 FitPlan</h1>
        <Clock />
        <nav>
          {TABS.map((t) => (
            <button key={t} className={t === tab ? 'active' : ''} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 'Calendario' && (
          <div className="grid2">
            <Calendar events={events} routines={routines} selected={selected} onSelect={setSelected} />
            <Agenda
              date={selected}
              events={events}
              routines={routines}
              routineDone={routineDone}
              onToggleRoutine={toggleRoutine}
              onAdd={addEvent}
              onToggle={toggleEvent}
              onRemove={removeEvent}
            />
          </div>
        )}
        {tab === 'Rutinas' && <Routines routines={routines} setRoutines={setRoutines} />}
        {tab === 'Ejercicios' && (
          <Exercises
            exercises={exercises}
            setExercises={setExercises}
            date={selected}
            onSchedule={addEvent}
          />
        )}
        {tab === 'Dieta' && (
          <Diet
            rules={rules}
            setRules={setRules}
            date={selected}
            checked={checks[selected] || []}
            onCheck={(ruleId) =>
              setChecks((prev) => {
                const cur = prev[selected] || []
                return {
                  ...prev,
                  [selected]: cur.includes(ruleId) ? cur.filter((x) => x !== ruleId) : [...cur, ruleId],
                }
              })
            }
          />
        )}
      </main>
    </div>
  )
}
