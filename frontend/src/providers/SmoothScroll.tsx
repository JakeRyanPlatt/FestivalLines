import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollProps = {
  children: ReactNode
}

function LenisSync({ children }: { children: ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => ScrollTrigger.update()
    const handleRaf = (time: number) => lenis.raf(time * 1000)

    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
    }

    lenis.on('scroll', handleScroll)
    gsap.ticker.add(handleRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', handleScroll)
      gsap.ticker.remove(handleRaf)
    }
  }, [lenis])

  return <>{children}</>
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    /* autoRaf MUST be false, 
    ReactLenis runs its own internal requestAnimationFrame loop by default. 
    SmoothScroll.tsx is also driving lenis.raf() off gsap.ticker 
    -You now have two RAF loops fighting over the same Lenis instance
     **unless autoRaf is explicitly turned off on the provider.
    */
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      <LenisSync>{children}</LenisSync>
    </ReactLenis>
  )
}
