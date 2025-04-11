const Header = () => {
  return (
    <div
      className="bg-indigo-500 w-full"
      style={{ height: "10vh", paddingTop: "2.5vh" }}
    >
      <h1 className="text-2xl font-bold text-white text-center">KatKat</h1>
      <ul className="list-none text-center text-white">
        <li className="inline-block mx-2">
          <a href="/">Home</a>
        </li>
        <li className="inline-block mx-2">
          <a href="/pomodoro">Pomodoro</a>
        </li>
        <li className="inline-block mx-2">
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};
export default Header;
