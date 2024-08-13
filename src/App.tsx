import { FC } from "react";
import { Todo } from "./Todo";
import TodoProvider from "./context/TodoContext";
const App: FC = () => {
  return (
    <div className="bg-gray-200">
      <div
        className="bg-indigo-500 w-full"
        style={{ height: "10vh", paddingTop: "2.5vh" }}
      >
        <h1 className="text-2xl font-bold text-white text-center">Todo List</h1>
      </div>

      <div className="container mx-auto w-full h-screen">
        <TodoProvider>
          <Todo />
        </TodoProvider>
      </div>
    </div>
  );
};

export default App;
