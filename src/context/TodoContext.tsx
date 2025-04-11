import {
  createContext,
  ChangeEvent,
  useState,
  FC,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { tTodo, tTodoContext } from "../types";
import { v4 as uuidv4 } from "uuid";
import { todoReducer } from "../reducers/todoReducer";
export const TodoListContext = createContext<tTodoContext | null>(null);

const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(todoReducer, []);
  const [todo, setTodo] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [isEdit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");
    console.log(">>>INITIALIZE");
    if (storedTodos && storedTodos.length > 0) {
      console.log(">>>SET ITEMS");
      dispatch({ type: "INIT", payload: storedTodos });
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todos", JSON.stringify(items));
    }
  }, [items]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (todo.length > 25) return;
    setTodo(e.target.value);
  };

  const handleDelete = (key: string): void => {
    dispatch({ type: "DELETE_TODO", payload: key });
    localStorage.setItem(
      "todos",
      JSON.stringify(items.filter((item) => item.id !== key)),
    );
  };

  const handleCheckbox = (id: string, updateTodo: tTodo) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, updateTodo } });
  };

  const handleEditClick = (key: string): void => {
    setEdit(true);

    const selected = items.find((item) => item.id === key);
    setId(selected?.id ?? "");
    setTodo(selected?.title ?? "");
  };

  const handleSave = (): void => {
    if (todo === "") return;

    if (isEdit) {
      const selected = items.find((item) => item.id === id);
      if (selected) {
        const updateTodo: tTodo = { ...selected, title: todo };
        dispatch({ type: "UPDATE_TODO", payload: { id, updateTodo } });

        setTodo("");
        setEdit(false);
        setId("");
      }
      return;
    }

    const newTodo = {
      id: uuidv4(),
      title: todo,
      done: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    setTodo("");
  };

  return (
    <TodoListContext.Provider
      value={{
        items,
        todo,
        isEdit,
        handleChange,
        handleSave,
        handleCheckbox,
        handleDelete,
        handleEditClick,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoProvider;
