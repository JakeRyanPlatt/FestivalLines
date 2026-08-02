import './App.css'
import { DabbLoungeHero } from './components/sections/DabbLoungeHero'
import { DabbLoungeLineup } from './components/sections/DabbLoungeLineup'
import { DabbLoungeSchedule } from './components/sections/DabbLoungeSchedule'
import { DabbLoungeExperience } from './components/sections/DabbLoungeExperience'
import { DabbLoungeVenue } from './components/sections/DabbLoungeVenue'

function App() {
  return (
    <>
      <section id="hero">
        <DabbLoungeHero />
      </section>

      <section id="schedule">
        <DabbLoungeSchedule />
      </section>

      <section id="lineup">
        <DabbLoungeLineup />
      </section>

      <section id="experience">
        <DabbLoungeExperience />
      </section>

      <section id="venue">
        <DabbLoungeVenue />
      </section>

    </>
  )
}

export default App
