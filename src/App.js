import { useEffect, useState } from 'react';
import './App.css';
import Die from './component/Dice';
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice]= useState(allNewDice())
  const [tenzies, setTenzies]= useState(false)
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(()=>{
    const firstValue = dice[0].value
    const heldVerification = dice.every(x => x.isHeld === true)
    const valueVerification = dice.every(x => x.value === firstValue)
    if (heldVerification && valueVerification) {
      setTenzies(true)
      console.log("you Won!")
    }
  },[dice])

  useEffect(() =>{
    let interval = null;
    if(!tenzies ){
      interval = setInterval(() => {
        setSeconds((prevSec) => { 
          if((prevSec % 60 ) === 0 && prevSec != 1 && prevSec != 0 ){
            setMinutes( prevMin => prevMin + 1)
            setSeconds(0)
          }
          return prevSec + 1})
        }, 1000);
      } else if(tenzies){
        clearInterval(interval)
      }
    
      return () => clearInterval(interval)
  }, [tenzies])
    

  function allNewDice (){
    const array = []
    for (let i= 0; i < 10; i++ ){
      array.push({ 
        value: Math.ceil(Math.random() * 6), 
        isHeld:false,
        id: i
      })
    }
    return array
  }

  function rollDice (){
    if (tenzies === true){
      setDice(allNewDice)
      setTenzies(false)
      setRolls(0)
      setSeconds(0)
      setMinutes(0)
    }
    else{
      setRolls(rolls + 1)
      setDice(prevValue => prevValue.map(die => {
          return die.isHeld !== true ? {
          ...die, value: Math.ceil(Math.random() * 6)}:
        die
        })
      )}
  }

  function holdDice (ide) {
    setDice(prevValue => prevValue.map(die => {
      return die.id === ide ? {
        ...die, isHeld: !die.isHeld}:
        die
    })
  )}

  const diceElements = dice.map(x => < Die value={x.value} isHeld={x.isHeld} key={x.id} holdDice={()=>holdDice(x.id)} />) 

  
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main className="main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <section className="counterWrapper">
          <h1> Numbers of Rolls: {rolls} </h1>
          <h1> Time: {minutes}:{seconds<10 ? "0": ""}{seconds} </h1>

        </section>
        <section className="diceWrapper">
          {diceElements}
        </section>
          <button className="rollButton" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
      
    </div>
  );
}

export default App;
