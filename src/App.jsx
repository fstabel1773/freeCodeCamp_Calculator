import { useState } from 'react'
import Display from './Components/Display'
import Keyboard from './Components/Keyboard'
import { numbers, operators } from './assets/data'

function App() {
  const [fullInput, setFullInput] = useState("")
  const [currentInput, setCurrentInput] = useState("0")
 

  function handleNumbers(value) {
    if (fullInput.includes("=")) {
      setCurrentInput(value)
      setFullInput(value)
    } else {
      if (currentInput === "0" || operators.includes(currentInput)) {
        setCurrentInput(value)
      } else {
        setCurrentInput(prevCurrentInput => prevCurrentInput + value)
      }
       
      const fullInputArray = fullInput.split(/[\+\-x\/]/)
      if (fullInputArray[fullInputArray.length - 1] != "0") 
      {
        setFullInput(prevFullInput => prevFullInput + value)
      } else if (value != "0") {
        setFullInput(prevFullInput => prevFullInput.slice(0, -1) + value)
      }
    }
  }

  function handleDecimal() {
    if (numbers.includes(currentInput.slice(-1)) 
    && !currentInput.includes(".")
    && !fullInput.includes("=")) {
      fullInput === "" 
        ? setFullInput(prevFullInput => prevFullInput + "0.") 
        : setFullInput(prevFullInput => prevFullInput + ".") 
      setCurrentInput(prevCurrentInput => prevCurrentInput + ".")
    }
  }

  function handleOperators(value) {
    if (fullInput.includes("=")) {
      setFullInput(currentInput)
    }
    if (currentInput.slice(-1) != ".") {
      setCurrentInput(value)
      fullInput != "" ? setFullInput(prevFullInput => prevFullInput + value) : {} 
    }
  }

  function handleClear() {
    setCurrentInput("0");
    setFullInput("")
  }

  function handleEquals() {
    getResult(fullInput)
  }

  function getResult(mathString) {
    // function takes string containing numbers and operators computes 
    // result and updates currentInput and fullInput. 
    // description of approach: splits this into two arrays for operators 
    // and numbers, erases unnecessary operator-characters and then zipping 
    // them together again to a valid string, 
    // which finally is evaluated by eval() to a result-string. 

    let calculationString = mathString.replaceAll("x", "*")

    const multipleOperatorsPattern = /[\+\-\*\/]{2,}/g

    if (calculationString.search(multipleOperatorsPattern) != -1) {
      const numbersStringArray = calculationString.split(multipleOperatorsPattern)
      let operatorsGroupArray = calculationString.match(multipleOperatorsPattern)
      operatorsGroupArray = operatorsGroupArray.map(operatorsGroupString => {
        return (operatorsGroupString.endsWith("-") 
          ? operatorsGroupString.slice(-2) 
          : operatorsGroupString.slice(-1)
        )
      })

      const calculationStringArray = numbersStringArray.map((number, index) => {
        return ( operatorsGroupArray[index] 
          ? number + operatorsGroupArray[index] 
          : number
        )
      })
      calculationString = calculationStringArray.join("")
    }

    const result = eval(calculationString).toString()

    setCurrentInput(result)
    setFullInput(prevFullInput => prevFullInput + "=" + result)
  }

 function handleInput(value) {
  switch (true) {
    case numbers.includes(value):
      handleNumbers(value);
      break;
    case value === ".":
      handleDecimal()
      break;
    case operators.includes(value):
      handleOperators(value)
      break;
    case value === "AC":
      handleClear()
      break;
    case value === "=":
      handleEquals()
      break;
  }
 }

  return (
    <div className="calculator--container">
      <Display currentInput={currentInput} fullInput={fullInput} />
      <Keyboard handleInput={handleInput} />
    </div>
  )
}

export default App
