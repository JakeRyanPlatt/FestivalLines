import './FestivalSchedule.css'

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
            <div className="festival-schedule__cell" role="cell">
              {row.monolith}
            </div>
            <div className="festival-schedule__cell" role="cell">
              {row.canyon}
            </div>
            <div className="festival-schedule__cell" role="cell">
              {row.dome}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

