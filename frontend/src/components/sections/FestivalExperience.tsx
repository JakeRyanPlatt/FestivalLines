import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FestivalExperience.css'

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

export function FestivalExperience() {
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
    <section className="festival-experience" ref={sectionRef} aria-labelledby="festival-experience-title">
      <div className="festival-experience__header" ref={headerRef}>
        <div className="festival-experience__intro">
          <div className="festival-experience__eyebrow">
            <span className="festival-experience__eyebrow-mark" aria-hidden="true" />
            <span>Experience</span>
          </div>

          <div className="festival-experience__intro-row">
            <h2 className="festival-experience__title-block" id="festival-experience-title">
              Experience
            </h2>
            <p className="festival-experience__copy-block">
              A modernist compound of sonic rituals, industrial markets, and high-tech wellness—built for the megacity perimeter.
            </p>
          </div>
        </div>

        <div className="festival-experience__feature" aria-hidden="true">
          <div className="festival-experience__stars" />
          <div className="festival-experience__stars festival-experience__stars--secondary" />
          <div className="festival-experience__stars festival-experience__stars--tertiary" />
          <div className="festival-experience__feature-overlay" />
        </div>
      </div>

      <div className="festival-experience__grid" role="list">
        {cards.map((card, index) => (
          <article
            className="festival-experience__card"
            key={card.title}
            role="listitem"
            ref={(node) => {
              cardRefs.current[index] = node
            }}
          >
            <img className="festival-experience__image" src={card.image} alt="" />
            <div className="festival-experience__overlay" aria-hidden="true" />
            <div className="festival-experience__content">
              <h3 className="festival-experience__title">{card.title}</h3>
              <p className="festival-experience__copy">{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

