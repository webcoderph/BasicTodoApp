import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { tPomodoroContext } from "../types";

export const PomodoroContext = createContext<tPomodoroContext | null>(null);

export const PomodorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [totalWorkMinutes, setWorkMinutes] = useState(25);
  const [totalBreakMinutes, setBreakMinutes] = useState(5);
  const [isWorkTime, setWorkTime] = useState(true);

  useEffect(() => {
    const storedSettings = JSON.parse(
      localStorage.getItem("pomodoro_app") ?? "{}",
    );
    if (Object.keys(storedSettings).length > 0) {
      setWorkMinutes(storedSettings.totalWorkMinutes);
      setBreakMinutes(storedSettings.totalBreakMinutes);
    }
  }, []);

  return (
    <PomodoroContext.Provider
      value={{
        totalWorkMinutes,
        totalBreakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        isWorkTime,
        setWorkTime,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
