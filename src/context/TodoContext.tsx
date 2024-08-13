import {
  createContext,
  ChangeEvent,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { tTodo, tTodoContext } from "../types";
import { v4 as uuidv4 } from "uuid";

export const TodoListContext = createContext<tTodoContext | null>(null);

const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<tTodo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [isEdit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") ?? "[]");
    console.log(">>>INITIALIZE");
    if (storedTodos) {
      console.log(">>>SET ITEMS");
      setItems(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("todos", JSON.stringify(items));
    }
  }, [items]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };

  const handleDelete = (key: string): void => {
    setItems(items.filter((item) => item.title !== key));
    localStorage.setItem(
      "todos",
      JSON.stringify(items.filter((item) => item.title !== key)),
    );
  };

  const handleCheckbox = (index: number, updateTodo: tTodo) => {
    setItems(
      items
        .map((item: tTodo, i: number) => {
          if (i == index) return updateTodo;
          else return item;
        })
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1)),
    );
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
        setItems(
          items
            .map((item: tTodo) => {
              if (item.id === id) return updateTodo;
              else return item;
            })
            .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1)),
        );

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

    setItems([...items, newTodo]);
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
