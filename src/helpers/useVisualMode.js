import { useState } from "react";

//custom hook- to make transitions among the actions--> moving forward and backward with the component
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // to hold the transition actions

  function transition(next, replace = false) {
    setMode(next);
    replace
      ? setHistory([...history.slice(0, history.length - 1), next])
      : setHistory([...history, next]);
  }

  function back() {
    const newHis = history.slice(0, history.length - 1);
    const lastValue = newHis[newHis.length - 1];
    // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
    setHistory(newHis);
    if (mode !== initial) {
      setMode(lastValue);
    }
  }

  return { mode, transition, back };
}
