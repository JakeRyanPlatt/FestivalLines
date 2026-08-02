import { useState } from 'react'
import './DabbLoungeLineup.css'

type DayId = 'full' | 'fri' | 'sat' | 'sun'

interface DayLineup {
  headliners: string[]
  support: string[]
  undercard: string[]
  intro: string
}

const DAYS: Array<{ id: DayId; label: string }> = [
  { id: 'full', label: 'Full Weekend' },
  { id: 'fri', label: 'Friday Jun 20' },
  { id: 'sat', label: 'Saturday Jun 21' },
  { id: 'sun', label: 'Sunday Jun 22' },
]
const LINEUP: Record<DayId, DayLineup> = {
  full: {
    headliners: ['NINE INCH NAILS', 'MASSIVE ATTACK', 'GESAFFELSTEIN'],
    support: [
      'PORTISHEAD',
      'FEVER RAY',
      'HEALTH',
      'BOY HARSHER',
      'MODERAT',
      'CHELSEA WOLFE',
    ],
    undercard: [
      'TR/ST',
      'MOLCHAT DOMA',
      'DRAB MAJESTY',
      'COLD CAVE',
      'LEBANON HANOVER',
      'MAREUX',
      'SHE PAST AWAY',
      'KONTRAVOID',
      'ACTORS',
      'MINUIT MACHINE',
      'THE KVB',
      'TWIN TRIBES',
      'FRENCH POLICE',
      'AUTOMATIC',
      'PIXEL GRIP',
      'CHOIR BOY',
      'KÆLAN MIKLA',
      'NATION OF LANGUAGE',
    ],
    intro:
      'Three nights of architectural soundscapes, brutalist industrial, and modern darkwave — curated for the cold, concrete pulse of the city.',
  },
  fri: {
    headliners: ['GESAFFELSTEIN', 'FEVER RAY'],
    support: ['BOY HARSHER', 'TR/ST', 'COLD CAVE'],
    undercard: ['MAREUX', 'KONTRAVOID', 'MINUIT MACHINE', 'PIXEL GRIP'],
    intro:
      'Friday establishes a sterile, high-contrast environment driven by modern EBM, dark synth, and clinical club precision.',
  },
  sat: {
    headliners: ['NINE INCH NAILS', 'HEALTH'],
    support: ['CHELSEA WOLFE', 'DRAB MAJESTY', 'ACTORS'],
    undercard: ['SHE PAST AWAY', 'TWIN TRIBES', 'THE KVB', 'FRENCH POLICE'],
    intro:
      'Saturday scales the brutalist architecture of sound, focusing on heavy industrial machinery and driving post-punk basslines.',
  },
  sun: {
    headliners: ['MASSIVE ATTACK', 'PORTISHEAD'],
    support: ['MODERAT', 'MOLCHAT DOMA', 'LEBANON HANOVER'],
    undercard: ['AUTOMATIC', 'CHOIR BOY', 'KÆLAN MIKLA', 'NATION OF LANGUAGE'],
    intro:
      'Sunday closes with a meticulous descent into downtempo textures, coldwave, and cinematic electronic weight.',
  },
};

function ArtistRow({ artists, className }: { artists: string[]; className: string }) {
  if (artists.length === 0) return null

  return (
    <div className={className}>
      {artists.map((artist, index) => (
        <div className="dabb-lineup__artist" key={artist}>
          <span>{artist}</span>
          {index < artists.length - 1 ? <span className="dabb-lineup__separator" aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  )
}

export function DabbLoungeLineup() {
  const [activeDay, setActiveDay] = useState<DayId>('full')
  const lineup = LINEUP[activeDay]

  return (
    <section className="dabb-lineup" aria-labelledby="dabb-lineup-title">
      <div className="dabb-lineup__header">
        <div className="dabb-lineup__eyebrow">
          <span className="dabb-lineup__eyebrow-mark" aria-hidden="true" />
          <span>The Soundsystem</span>
        </div>

        <div className="dabb-lineup__intro-row">
          <h2 className="dabb-lineup__title" id="dabb-lineup-title">
            2026 Lineup
          </h2>
          <p className="dabb-lineup__copy">{lineup.intro}</p>
        </div>
      </div>

      <div className="dabb-lineup__tabs" role="tablist" aria-label="Festival day">
        {DAYS.map((day) => (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={activeDay === day.id}
            className={`dabb-lineup__tab${activeDay === day.id ? ' is-active' : ''}`}
            onClick={() => setActiveDay(day.id)}
          >
            {day.label}
          </button>
        ))}
      </div>

      <div className="dabb-lineup__content">
        <ArtistRow artists={lineup.headliners} className="dabb-lineup__row dabb-lineup__row--headliners" />
        <div className="dabb-lineup__divider" aria-hidden="true" />
        <ArtistRow artists={lineup.support} className="dabb-lineup__row dabb-lineup__row--support" />
        <ArtistRow artists={lineup.undercard} className="dabb-lineup__row dabb-lineup__row--undercard" />
      </div>
    </section>
  )
}
