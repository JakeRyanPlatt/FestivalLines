import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FestivalVenue.css'

gsap.registerPlugin(ScrollTrigger)

const details = [
  {
    number: '01',
    title: 'The Halls',
    copy:
      'Four interconnected exhibition halls transformed into stage environments. Each hall carries its own acoustic signature and lighting narrative — from cathedral reverb to intimate black-box clarity.',
  },
  {
    number: '02',
    title: 'Getting There',
    copy:
      'Direct ICE connections from Frankfurt, Munich, and Zurich to Stuttgart Hauptbahnhof. Dedicated festival shuttles run every 15 minutes from the station. Stuttgart Airport (STR) is 20 minutes by S-Bahn.',
  },
  {
    number: '03',
    title: 'Accommodation',
    copy:
      'Partner hotels within walking distance in Stuttgart-Mitte. Festival camping available at the Cannstatter Wasen grounds with shuttle service. Early-bird hotel packages available with ticket bundles.',
  },
]

export function FestivalVenue() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current.filter(Boolean), {
        y: 24,
        x: (index: number) => (index % 2 === 0 ? -18 : 18),
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.16,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          end: 'bottom 25%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="festival-venue" ref={sectionRef} aria-labelledby="festival-venue-title">
      <div className="festival-venue__header">
        <div className="festival-venue__eyebrow">
          <span className="festival-venue__eyebrow-mark" aria-hidden="true" />
          <span>The Location</span>
        </div>

        <div className="festival-venue__intro">
          <h2 className="festival-venue__title" id="festival-venue-title">
            Atelier Bruckner | Stuttgart
          </h2>
          <p className="festival-venue__copy">
            A world-renowned scenography studio turned festival ground. Three nights inside Stuttgart&apos;s most immersive architectural space — where light, sound, and spatial narrative converge.
          </p>
        </div>
      </div>

      <div className="festival-venue__content">
        <div className="festival-venue__image-wrap" aria-hidden="true">
          <img
            className="festival-venue__image"
            src="https://www.figma.com/api/mcp/asset/b542d229-60b1-4a95-af98-61997967ccde"
            alt=""
          />
          <div className="festival-venue__image-overlay" />
        </div>

        <div className="festival-venue__details" role="list">
          {details.map((detail, index) => (
            <article
              className="festival-venue__detail"
              key={detail.number}
              role="listitem"
              ref={(node) => {
                cardRefs.current[index] = node
              }}
            >
              <div className="festival-venue__detail-label">
                <span className="festival-venue__detail-number">{detail.number}</span>
                <h3>{detail.title}</h3>
              </div>
              <p>{detail.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

