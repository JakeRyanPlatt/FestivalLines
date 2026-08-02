import { useLayoutEffect, useRef, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import './FestivalHero.css'

gsap.registerPlugin(ScrollTrigger)

const splashImage =
  'https://www.figma.com/api/mcp/asset/9571fbb9-574d-4e72-9d79-952d32a4455e'
const arrowRightImage =
  'https://www.figma.com/api/mcp/asset/a884d2a4-b19a-4468-bd6d-004511cf47bc'

const navItems = [
  { label: 'Schedule', href: '#schedule' },
  { label: 'Lineup', href: '#lineup' },
  { label: 'Experience', href: '#experience' },
]

export function FestivalHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const titleBlockRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLAnchorElement | null>(null)
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const lenis = useLenis()

  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.replace('#', '')
    const target = targetId ? document.getElementById(targetId) : null

    if (!target) return

    event.preventDefault()

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2, offset: 0 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const entranceTargets = [
        titleBlockRef.current,
        detailsRef.current,
        navRef.current,
        ctaRef.current,
      ].filter(Boolean)

      gsap.from(entranceTargets, {
        y: 32,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.2,
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      })
        .to(imageRef.current, { yPercent: 6, scale: 1.02, ease: 'none' }, 0)
        .to(overlayRef.current, { opacity: 0.45, ease: 'none' }, 0)
        .to(contentRef.current, { yPercent: -3, opacity: 0.95, ease: 'none' }, 0)
        .to(titleBlockRef.current, { y: -8, opacity: 0.95, ease: 'power1.out' }, 0)
        .to(detailsRef.current, { y: 6, opacity: 0.92, ease: 'power1.out' }, 0)
        .to(navRef.current, { y: 4, opacity: 0.9, ease: 'power1.out' }, 0)
        .to(ctaRef.current, { y: 8, opacity: 0.92, ease: 'power1.out' }, 0)

      if (pillRefs.current.length) {
        gsap.to(pillRefs.current, {
          y: (index: number) => (index % 2 === 0 ? -3 : 3),
          rotate: (index: number) => (index % 2 === 0 ? -0.6 : 0.6),
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="festival-hero" ref={sectionRef} aria-label="Festival Lines landing">
      <div className="festival-hero__backdrop" aria-hidden="true">
        <img className="festival-hero__image" ref={imageRef} src={splashImage} alt="" />
        <div className="festival-hero__overlay" ref={overlayRef} />
      </div>

      <div className="festival-hero__content" ref={contentRef}>
        <div className="festival-hero__title-block" ref={titleBlockRef}>
          <h1 className="festival-hero__headline">FESTIVAL LINES</h1>
        </div>

        <div className="festival-hero__details" ref={detailsRef}>
          <p className="festival-hero__date">JUNE 20-22, 2028</p>
          <span className="festival-hero__divider" aria-hidden="true" />
          <p className="festival-hero__venue">ATELIER BRUCKNER, STUTTGART</p>
        </div>

        <nav className="festival-hero__nav" ref={navRef} aria-label="Festival sections">
          {navItems.map((item, index) => (
            <a
              className="festival-hero__pill"
              href={item.href}
              key={item.label}
              onClick={(event) => handleSectionLink(event, item.href)}
              ref={(node) => {
                pillRefs.current[index] = node
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="festival-hero__cta" href="#lineup" onClick={(event) => handleSectionLink(event, '#schedule')} ref={ctaRef}>
          <span>Enter</span>
          <img className="festival-hero__arrow" src={arrowRightImage} alt="" />
        </a>
      </div>
    </section>
  )
}

