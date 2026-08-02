import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './DabbLoungeExperience.css'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Intimate Lounge',
    copy: 'Candlelit corners, velvet seating, and soft ambient light for late-night conversations.',
    image:
      'https://www.figma.com/api/mcp/asset/069f01b3-62ad-4680-b196-6a7d15d2d022',
  },
  {
    title: 'Marble Bar',
    copy: 'A polished dark marble bar with brass fixtures, premium pours, and warm, intimate lighting.',
    image:
      'https://www.figma.com/api/mcp/asset/6128870b-5176-459e-a6b3-8485f5b1dfd9',
  },
  {
    title: 'Velvet Lounge',
    copy: 'Deep velvet seating areas with soft diffused light, perfect for relaxing between sets.',
    image:
      'https://www.figma.com/api/mcp/asset/22f470f7-9e6f-43c6-8bc4-1a415f59dcb2',
  },
  {
    title: 'Night Garden',
    copy: 'An atmospheric glass-walled space at night, with warm tones and soft reflections.',
    image:
      'https://www.figma.com/api/mcp/asset/cb50f46a-3762-46aa-843a-930a729520b8',
  },
]

export function DabbLoungeExperience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 18,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.from(cardRefs.current.filter(Boolean), {
        y: 28,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.to(cardRefs.current.filter(Boolean), {
        yPercent: (index: number) => (index % 2 === 0 ? 5 : -4),
        opacity: 0.92,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.3,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="dabb-experience" ref={sectionRef} aria-labelledby="dabb-experience-title">
      <div className="dabb-experience__header" ref={headerRef}>
        <div className="dabb-experience__intro">
          <div className="dabb-experience__eyebrow">
            <span className="dabb-experience__eyebrow-mark" aria-hidden="true" />
            <span>Experience</span>
          </div>

          <div className="dabb-experience__intro-row">
            <h2 className="dabb-experience__title-block" id="dabb-experience-title">
              Experience
            </h2>
            <p className="dabb-experience__copy-block">
              A modernist compound of sonic rituals, industrial markets, and high-tech wellness—built for the megacity perimeter.
            </p>
          </div>
        </div>

        <div className="dabb-experience__feature" aria-hidden="true">
          <div className="dabb-experience__stars" />
          <div className="dabb-experience__stars dabb-experience__stars--secondary" />
          <div className="dabb-experience__stars dabb-experience__stars--tertiary" />
          <div className="dabb-experience__feature-overlay" />
        </div>
      </div>

      <div className="dabb-experience__grid" role="list">
        {cards.map((card, index) => (
          <article
            className="dabb-experience__card"
            key={card.title}
            role="listitem"
            ref={(node) => {
              cardRefs.current[index] = node
            }}
          >
            <img className="dabb-experience__image" src={card.image} alt="" />
            <div className="dabb-experience__overlay" aria-hidden="true" />
            <div className="dabb-experience__content">
              <h3 className="dabb-experience__title">{card.title}</h3>
              <p className="dabb-experience__copy">{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
