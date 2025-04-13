import { FormEvent, useEffect, useState } from "react";
import Header from "./components/Header";

const Settings = () => {
  const [workMins, setWorkMins] = useState(0);
  const [breakMins, setBreakMins] = useState(0);

  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const storedSettings = JSON.parse(
      localStorage.getItem("pomodoro_app") ?? "{}",
    );
    if (Object.keys(storedSettings).length > 0) {
      setBreakMins(storedSettings.totalBreakMinutes);
      setWorkMins(storedSettings.totalWorkMinutes);
    }
  }, []);

  const handleWorkChange = (e: FormEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.currentTarget.value))) return;
    setWorkMins(+e.currentTarget.value);
  };

  const handleBreakChange = (e: FormEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.currentTarget.value))) return;
    setBreakMins(+e.currentTarget.value);
  };

  const handleSave = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInProgress(true);
    const pomodoroApp = {
      totalWorkMinutes: workMins,
      totalBreakMinutes: breakMins,
    };
    localStorage.removeItem("pomodoro_app");
    localStorage.setItem("pomodoro_app", JSON.stringify(pomodoroApp));

    setTimeout(() => {
      window.location.href = "/pomodoro";
    }, 2000);
  };

  return (
    <>
      <div className="bg-gray-200">
        <Header />
        <div className="container mx-auto w-6/12 h-screen">
          <h3 className="text-3xl font-bold mb-4 mt-4">Settings</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Work Minutes
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="number"
                value={workMins}
                onChange={handleWorkChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Break Minutes
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="number"
                value={breakMins}
                onChange={handleBreakChange}
              />
            </div>

            <button
              className="h-10 w-full text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
              onClick={handleSave}
              disabled={inProgress}
            >
              {inProgress ? "In-Progress" : "SAVE"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
