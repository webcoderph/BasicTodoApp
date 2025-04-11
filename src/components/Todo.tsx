import { useContext, MouseEvent, ReactNode } from "react";
import { tTodoContext } from "../types/index";
import { TodoListContext } from "../context/TodoContext";
import TodoProvider from "../context/TodoContext";

function useTodoContext() {
  const context = useContext(TodoListContext) as tTodoContext;
  if (!context) throw new Error("Invalid Component!");

  return context;
}

export const Todo = ({ children }: { children: ReactNode }) => {
  return <TodoProvider>{children}</TodoProvider>;
};

Todo.Textarea = () => {
  const { handleChange, todo } = useTodoContext();

  return (
    <div className="flex justify-center">
      <div className="w-96 mt-10">
        <textarea
          value={todo}
          onChange={handleChange}
          maxLength={100}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:shadow focus:outline-none"
        />
      </div>
    </div>
  );
};

Todo.Button = () => {
  const { handleSave, isEdit } = useTodoContext();
  return (
    <div className="flex justify-center">
      <div className="w-96">
        <button
          onClick={handleSave}
          className="h-10 w-full text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
        >
          {isEdit ? "Save" : "Add"}
        </button>
      </div>
    </div>
  );
};

Todo.Form = () => {
  const { handleChange, todo, handleSave, isEdit } = useTodoContext();

  return (
    <div className="flex justify-center">
      <div className="relative mt-10">
        <div className="absolute top-4 left-3">
          <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
        </div>
        <input
          type="text"
          value={todo}
          onChange={handleChange}
          maxLength={20}
          className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleSave}
            className="h-10 w-20 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

Todo.List = () => {
  const { handleCheckbox, items, handleEditClick, handleDelete } =
    useTodoContext();

  const viewTodo = (e: MouseEvent) => {
    console.log(e.target);
  };
  return (
    <div className="flex justify-center">
      <ul style={{ listStyleType: "none", marginTop: "20px" }}>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={(e) => viewTodo(e)}
            className={
              "p-4 w-96 relative rounded bg-white shadow-2xl mb-2 " +
              (item.done
                ? "text-gray-300 line-through transition-all duration-700 dark:text-slate-500"
                : "text-gray-500 transition-all duration-700 dark:text-slate-400")
            }
          >
            <input
              type="checkbox"
              checked={!!item.done}
              onChange={(e) =>
                handleCheckbox(item.id, { ...item, done: e.target.checked })
              }
            />{" "}
            {item?.title?.substring(0, 25)}
            <div className="absolute inset-y-0 right-0 pt-2">
              <div className="flex">
                <button
                  onClick={() => handleEditClick(item.id)}
                  style={{ padding: "8px" }}
                  className="bg-indigo-500 rounded-lg w-10 h-10 text-white mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    {/*<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                    <path
                      fill="white"
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="h-10  text-white rounded-lg bg-red-500 w-10 mr-2"
                >
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
