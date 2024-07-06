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
      obj.id = i;
      obj.key = i;
      newDice.push(obj);
    }
    return newDice;
  }

  function holdDice(id) {
    console.log(id);

    setDice((prevState) => {
      return prevState.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return { ...die };
        }
      });
    });

    console.log(dice);
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die, index) => (
    <Die
      key={die.key}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => {
        holdDice(index);
      }}
    />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
