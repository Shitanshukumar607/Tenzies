import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allSameValue && allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 12; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((prevState) => {
      return prevState.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return { ...die };
        }
      });
    });
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((prevState) => {
        return prevState.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    }
  }

  const diceElements = dice.map((die, index) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  const [width, height] = useWindowSize();

  return (
    <main>
      {tenzies && <Confetti height={height} width={width} />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll 🎲"}</button>
    </main>
  );
}

export default App;
