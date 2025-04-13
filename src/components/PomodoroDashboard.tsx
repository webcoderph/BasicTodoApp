import Header from "./Header";
import { useState, useEffect, useRef, useContext } from "react";
import { PomodoroContext } from "../context/PomodoroContext";
import { tPomodoroContext } from "../types";
const PomodoroDashboard = () => {
  const { totalWorkMinutes, totalBreakMinutes, isWorkTime, setWorkTime } =
    useContext(PomodoroContext) as tPomodoroContext;
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(totalWorkMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const timeRef = useRef(time);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    if (isWorkTime) {
      setTime(totalWorkMinutes * 60);
      timeRef.current = totalWorkMinutes * 60;
    } else {
      setTime(totalBreakMinutes * 60);
      timeRef.current = totalBreakMinutes * 60;
    }
  }, [totalWorkMinutes, isWorkTime, totalBreakMinutes]);

  const tick = () => {
    timeRef.current--;
    setTime(timeRef.current);
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (isPausedRef.current) return;

        if (timeRef.current === 0) {
          setIsRunning(false);
        }
        tick();
      }, 1000);
    } else {
      //reset
      setIsPaused(false);
      const defaultTime = isWorkTime ? totalWorkMinutes : totalBreakMinutes;
      setTime(defaultTime * 60);
      timeRef.current = defaultTime * 60;
      setIsPaused(false);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div className="bg-grahy-200">
      <Header />
      <div className="container mx-auto w-full h-screen">
        <h1 className="text-3xl text-center font-bold mb-5 mt-5">Pomodoro</h1>
        <div className="flex justify-center mb-5">
          <div className="text-6xl font-bold w-24">{`${minutes}`}:</div>
          <div className="text-6xl font-bold w-24">{`${seconds}`}</div>
        </div>
        <div className="flex justify-center">
          {!isRunning && (
            <button
              className="bg-green-500 w-20 h-10 me-2 text-white"
              onClick={() => setIsRunning(true)}
            >
              Start
            </button>
          )}

          {isRunning && (
            <>
              <button
                className={
                  "text-white w-20 h-10 me-2" +
                  (isPaused ? " bg-green-500" : " bg-gray-500")
                }
                onClick={() => {
                  setIsPaused(!isPaused);
                  isPausedRef.current = !isPaused;
                }}
              >
                {isPaused ? "Play" : "Pause"}
              </button>

              <button
                className="bg-red-500 w-20 h-10 me-2 text-white"
                onClick={() => setIsRunning(false)}
              >
                Stop
              </button>
            </>
          )}
          {isWorkTime ? (
            <button
              className="bg-yellow-500 w-20 h-10 me-2 text-white"
              onClick={() => setWorkTime(false)}
            >
              Break
            </button>
          ) : (
            <button
              className="bg-blue-500 w-20 h-10 me-2 text-white"
              onClick={() => setWorkTime(true)}
            >
              Work
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PomodoroDashboard;
