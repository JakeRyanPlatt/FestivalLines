import './FestivalSchedule.css'
import { useState } from 'react'

interface ScheduleRow {
  time: string
  monolith: string
  canyon: string
  dome: string
}

const SCHEDULE: ScheduleRow[] = [
  { time: '16:00 - 18:00', monolith: 'VALESKA', canyon: 'DURANTE', dome: 'JOPLYN' },
  { time: '18:30 - 20:30', monolith: 'PEGGY GOU', canyon: 'ELKKA', dome: 'TSHA' },
  { time: '21:00 - 22:30', monolith: 'JUSTICE', canyon: 'BICEP (CHROMA)', dome: 'PARRA FOR CUVA' },
  { time: '23:00 - 01:00', monolith: 'RÜFÜS DU SOL', canyon: 'JAMIE XX', dome: 'FOUR TET' },
  { time: '01:30 - END', monolith: 'LATE NIGHT JAM', canyon: 'SKIN ON SKIN', dome: 'MONOLINK (DJ)' },
]

export function FestivalSchedule() {
  const [reservedCounts, setReservedCounts] = useState<Record<string, number>>({})

  function reserve(performanceId: string) {
    setReservedCounts((currentCounts) => ({
      ...currentCounts,
      [performanceId]: (currentCounts[performanceId] ?? 0) + 1,
    }))
  }

  return (
    <section className="festival-schedule" aria-labelledby="festival-schedule-title">
      <div className="festival-schedule__header">
        <div className="festival-schedule__eyebrow">
          <span className="festival-schedule__eyebrow-mark" aria-hidden="true" />
          <span>Timeline</span>
        </div>

        <div className="festival-schedule__intro-row">
          <h2 className="festival-schedule__title" id="festival-schedule-title">
            Schedule Matrix
          </h2>
          <p className="festival-schedule__copy">
            Three perimeter zones: the main monolith, the canyon bunker, and the resonance dome.
          </p>
        </div>
      </div>

      <div className="festival-schedule__table" role="table" aria-label="Festival schedule">
        <div className="festival-schedule__row festival-schedule__row--head" role="row">
          <div className="festival-schedule__cell festival-schedule__cell--time" role="columnheader">
            Time
          </div>
          <div className="festival-schedule__cell" role="columnheader">
            The Monolith (Main)
          </div>
          <div className="festival-schedule__cell" role="columnheader">
            The Canyon
          </div>
          <div className="festival-schedule__cell" role="columnheader">
            The Resonance Dome
          </div>
        </div>

        {SCHEDULE.map((row) => (
            //search for conflicting times
            //Show times
          <div className="festival-schedule__row" role="row" key={row.time}>
            <div className="festival-schedule__cell festival-schedule__cell--time" role="cell">
              {row.time}
            </div>
            {[['monolith', row.monolith], ['canyon', row.canyon], ['dome', row.dome]].map(([venue, artist]) => {
              const performanceId = `${row.time}-${venue}`

              return (
                <div className="festival-schedule__cell" role="cell" key={performanceId}>
                  <div>{artist}</div>
                  <button type="button" onClick={() => reserve(performanceId)}>
                    Reserve
                  </button>
                  <div>{reservedCounts[performanceId] ?? 0} reserved</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

