import './App.css'
import { FestivalHero } from './components/sections/FestivalHero'
import { FestivalLineup } from './components/sections/FestivalLineup'
import { FestivalSchedule } from './components/sections/FestivalSchedule'
import { FestivalExperience } from './components/sections/FestivalExperience'
import { FestivalVenue } from './components/sections/FestivalVenue'

function App() {
  return (
    <>
      <section id="hero">
        <FestivalHero />
      </section>

      <section id="schedule">
        <FestivalSchedule />
      </section>

      <section id="lineup">
        <FestivalLineup />
      </section>

      <section id="experience">
        <FestivalExperience />
      </section>

      <section id="venue">
        <FestivalVenue />
      </section>

    </>
  )
}

export default App

