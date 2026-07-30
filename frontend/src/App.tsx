import { useState } from 'react'
import './App.css'
import LineupWireframe from './components/LineupWireframe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <h1>Festival App with Lenis</h1>
        <p>Scroll down to see smooth scrolling in action.</p>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((c) => c + 1)}
        >
          Count is {count}
        </button>
      </section>

      <section id="lineup">
        <LineupWireframe />
      </section>

      <section id="spacer">
        <p>More content down here to make the page scroll.</p>
      </section>
    </>
  )
}

export default App
