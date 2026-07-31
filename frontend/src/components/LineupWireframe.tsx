import { useState } from 'react'
import './LineupWireframe.css'

type DayId = 'full' | 'fri' | 'sat' | 'sun'

interface DayTab {
  id: DayId
  label: string
}

const DAYS: DayTab[] = [
  { id: 'full', label: 'Full Weekend' },
  { id: 'fri', label: 'Friday Jun 20' },
  { id: 'sat', label: 'Saturday Jun 21' },
  { id: 'sun', label: 'Sunday Jun 22' },
]

interface DayLineup {
  headliners: string[]
  supporting: string[]
  undercard: string[]
}

// TODO: replace with performances fetched from the API, grouped by day.
// The Postgres schema already enforces non-overlapping sets per stage/day
// via the EXCLUDE constraint, so once that endpoint exists this becomes a
// fetch + group-by instead of a hardcoded lookup. Per-day breakdowns below
// are left empty until that data exists — no point guessing who plays when.
const LINEUP: Record<DayId, DayLineup> = {
  full: {
    headliners: ['Massive Attack', 'Nine Inch Nails', 'Björk'],
    supporting: ['Depeche Mode', 'Portishead', 'Cocteau Twins', 'Bauhaus', 'Siouxsie', 'Fever Ray'],
    undercard: [
      'Boy Harsher', 'Cold Cave', 'Drab Majesty', 'Lebanon Hanover', 'Molchat Doma',
      'She Past Away', 'Twin Tribes', 'Kontravoid', 'Perturbator', 'Health',
      'Ritual Howls', 'Light Asylum', 'Kink (Live)', 'Parra For Cuva', 'Yulia Niko',
      'Desert Flyer', 'Valeska', 'Durante',
    ],
  },
  fri: { headliners: [], supporting: [], undercard: [] },
  sat: { headliners: [], supporting: [], undercard: [] },
  sun: { headliners: [], supporting: [], undercard: [] },
}

type Separator = 'dot' | 'plus' | 'dot-small'

function NameRow({
  names,
  separator,
  className,
}: {
  names: string[]
  separator: Separator
  className: string
}) {
  if (names.length === 0) return null

  return (
    <p className={className}>
      {names.map((name, i) => (
        <span className="lineup__name" key={name}>
          {name}
          {i < names.length - 1 && (
            <span
              className={
                separator === 'plus'
                  ? 'lineup__plus'
                  : separator === 'dot-small'
                  ? 'lineup__dot lineup__dot--small'
                  : 'lineup__dot'
              }
              aria-hidden="true"
            >
              {separator === 'plus' ? '+' : ''}
            </span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function LineupWireframe() {
  const [activeDay, setActiveDay] = useState<DayId>('full')
  const { headliners, supporting, undercard } = LINEUP[activeDay]

  return (
    <div className="lineup">
      <div className="lineup__header">
        <div className="lineup__eyebrow">
          <span className="lineup__eyebrow-mark" aria-hidden="true" />
          The Soundsystem
        </div>
        <div className="lineup__header-row">
          <h2 className="lineup__title">2026 Lineup</h2>
          <p className="lineup__intro">
            Three nights of industrial frequencies, darkwave, and live experimental
            soundscapes within the megacity perimeter.
          </p>
        </div>
      </div>

      <div className="lineup__tabs" role="tablist" aria-label="Festival day">
        {DAYS.map((day) => (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={activeDay === day.id}
            className={`lineup__tab${activeDay === day.id ? ' is-active' : ''}`}
            onClick={() => setActiveDay(day.id)}
          >
            {day.label}
          </button>
        ))}
      </div>

      {headliners.length > 0 ? (
        <>
          <NameRow
            names={headliners}
            separator="dot"
            className="lineup__names lineup__names--headliner"
          />
          <hr className="lineup__divider" />
          <NameRow
            names={supporting}
            separator="plus"
            className="lineup__names lineup__names--supporting"
          />
          <NameRow
            names={undercard}
            separator="dot-small"
            className="lineup__names lineup__names--undercard"
          />
        </>
      ) : (
        <p className="lineup__placeholder">Lineup for this day is still locked. Check back soon.</p>
      )}
    </div>
  )
}