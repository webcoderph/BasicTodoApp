import { useContext } from "react";
import { tTodoContext } from "./types/index";
import { List } from "./components/List";
import { TodoListContext } from "./context/TodoContext";
export const Todo = () => {
  const { handleChange, todo, handleSave, isEdit } = useContext(
    TodoListContext,
  ) as tTodoContext;
  return (
    <>
      <div className="flex justify-center">
        <div className="relative mt-10">
          <div className="absolute top-4 left-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
          <input
            type="text"
            value={todo}
            onChange={handleChange}
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
      <div style={{ clear: "both" }}></div>
      <div className="flex justify-center">
        <List />
      </div>
    </>
  );
};
