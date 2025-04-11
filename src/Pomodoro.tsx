import PomodoroDashboard from "./components/PomodoroDashboard";
import { PomodorProvider } from "./context/PomodoroContext";

const Pomodoro = () => {
  return (
    <PomodorProvider>
      <PomodoroDashboard />
    </PomodorProvider>
  );
};

export default Pomodoro;
