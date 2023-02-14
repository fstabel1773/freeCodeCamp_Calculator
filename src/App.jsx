import { useState } from 'react'
import Display from './Components/Display'
import Keyboard from './Components/Keyboard'

function App() {
  const [currentInput, setCurrentInput] = useState("test")
  const [fullInput, setFullInput] = useState("test full")



  return (
    <div className="calculator--container">
      <Display currentInput={currentInput} fullInput={fullInput} />
      <Keyboard />
    </div>
  )
}

export default App
