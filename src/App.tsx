import { FC } from "react";
import { Todo } from "./components/Todo";
import Header from "./components/Header";
const App: FC = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <div className="container mx-auto w-full h-screen">
        <Todo>
          <Todo.Textarea />
          <Todo.Button />
          <Todo.List />
        </Todo>
      </div>
    </div>
  );
};

export default App;
