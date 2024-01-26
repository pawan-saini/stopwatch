import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [timer, setTimer] = useState(0);
  const [state, setState] = useState("");
  const [intervalId, setIntervalId] = useState(0);

  function pauseTimer() {
    setState("pause");
    clearInterval(intervalId);
  }

  function stopTimer() {
    setState("stop");
    clearInterval(intervalId);
    setTimer(0);
  }

  useEffect(() => {
    console.log("I am re-rendering");
    let iId;
    if (state === "start") {
      iId = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
      setIntervalId(iId);
    }
    return () => {
      clearInterval(iId);
    };
  }, [state]);

  return (
    <div className="App">
      <div className="timer">
        <span className="digits">
          {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((timer / 10) % 100)).slice(-2)}
        </span>
      </div>
      {state === "stop" || state === "" ? (
        <button className="btn startBtn" onClick={() => setState("start")}>
          Start
        </button>
      ) : (
        ""
      )}
      {state === "pause" ? (
        <button className="btn startBtn" onClick={() => setState("start")}>
          Resume
        </button>
      ) : state === "start" ? (
        <button className="btn pauseBtn" onClick={pauseTimer}>
          Pause
        </button>
      ) : (
        ""
      )}
      {state !== "stop" && state !== "" ? (
        <button className="btn stopBtn" onClick={stopTimer}>
          Stop
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
