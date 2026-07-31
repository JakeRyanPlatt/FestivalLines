import { useEffect, useRef } from 'react'
import gsap from 'gsap'
/* 
gasp's ScrollTrigger plugin pairs with lenis to deliver heavy deliberate motion 

*/
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './RevealPatternsDemo.css'

gsap.registerPlugin(ScrollTrigger)

export default function RevealPatternsDemo() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    let pinTrigger: ScrollTrigger | undefined
    const ctx = gsap.context(() => {
      gsap.from('.reveal-demo__hero-copy', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-demo__hero',
          start: 'top 80%',
        },
      })

      gsap.from('.reveal-demo__chip', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.reveal-demo__stagger',
          start: 'top 80%',
        },
      })

      gsap.to('.reveal-demo__parallax-surface', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.reveal-demo__parallax',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      pinTrigger = ScrollTrigger.create({
        trigger: '.reveal-demo__pin-panel',
        start: 'top top',
        end: '+=700',
        pin: true,
        pinSpacing: false,
      })

      gsap.from('.reveal-demo__pin-copy', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-demo__pin-panel',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => {
      pinTrigger?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <section className="reveal-demo" ref={sectionRef}>
      <div className="reveal-demo__hero reveal-demo__panel">
        <div className="reveal-demo__hero-copy">
          <p className="reveal-demo__eyebrow">Figma motion starter</p>
          <h2 className="reveal-demo__headline">Use this as the first pass for section reveals.</h2>
          <p className="reveal-demo__body">
            Replace the placeholder copy with the actual Figma section content once the frame is
            mapped to a real component tree.
          </p>
        </div>
      </div>

      <div className="reveal-demo__panel reveal-demo__stagger">
        <div className="reveal-demo__header">
          <p className="reveal-demo__eyebrow">Staggered cards</p>
          <h3 className="reveal-demo__title">Good fit for feature rows or artist highlights.</h3>
        </div>

        <div className="reveal-demo__chips" aria-label="Example items">
          <div className="reveal-demo__chip">Parallax</div>
          <div className="reveal-demo__chip">Stagger</div>
          <div className="reveal-demo__chip">Pin</div>
          <div className="reveal-demo__chip">Scroll trigger</div>
        </div>
      </div>

      <div className="reveal-demo__parallax reveal-demo__panel">
        <div className="reveal-demo__parallax-surface" aria-hidden="true" />
        <div className="reveal-demo__parallax-copy">
          <p className="reveal-demo__eyebrow">Parallax layer</p>
          <h3 className="reveal-demo__title">Use for hero backgrounds or ambient motion.</h3>
        </div>
      </div>

      <div className="reveal-demo__panel reveal-demo__pin-panel">
        <div className="reveal-demo__pin-copy">
          <p className="reveal-demo__eyebrow">Pinned section</p>
          <h3 className="reveal-demo__title">This creates a sticky, narrative moment as you scroll.</h3>
          <p className="reveal-demo__body">
            Swap the placeholder content for an infographic, lineup summary, or a key CTA.
          </p>
        </div>
      </div>
    </section>
  )
}
