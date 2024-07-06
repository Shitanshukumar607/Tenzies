import { useState } from "react";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let obj = {};
      obj.value = Math.ceil(Math.random() * 6);
      obj.isHeld = true;
      newDice.push(obj);
    }
    return newDice;
  }

  console.log(dice);

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => (
    <Die value={die.value} isHeld={die.isHeld} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
