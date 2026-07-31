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
/*

*/ 
  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => ScrollTrigger.update()
    const handleRaf = (time: number) => lenis.raf(time * 1000)

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
    <ReactLenis root options={{ autoRaf: false}}>
      <LenisSync>{children}</LenisSync>
    </ReactLenis>
  )
}
