import { useState, ChangeEvent, useEffect } from "react";
import { tTodo } from "./types/index";
import { List } from "./components/List";
import { v4 as uuidv4 } from "uuid";
export const Todo = () => {
  const [list, setList] = useState<tTodo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [isEdit, setEdit] = useState<Boolean>(false);
  const [id, setId] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };

  const handleDelete = (key: string): void => {
    setList(list.filter((item) => item.title !== key));
  };

  const handleCheckbox = (index: number, updateTodo: tTodo) => {
    setList(
      list
        .map((item: tTodo, i: number) => {
          if (i == index) return updateTodo;
          else return item;
        })
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1)),
    );

    console.log(">>> LIST", list);
  };

  const handleEditClick = (key: string): void => {
    setEdit(true);

    const selected = list.find((item) => item.id === key);
    setId(selected?.id ?? "");
    setTodo(selected?.title ?? "");
    console.log(">>>VAL", selected);
  };

  const handleClick = (): void => {
    if (todo === "") return;

    if (isEdit) {
      const selected = list.find((item) => item.id === id);
      if (selected) {
        setList(
          list
            .map((item: tTodo) => {
              if (item.id === id) return { ...selected, title: todo };
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

    setList([...list, newTodo]);
    setTodo("");
  };
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
              onClick={handleClick}
              className="h-10 w-20 text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
            >
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </div>
      <div style={{ clear: "both" }}></div>
      <div className="flex justify-center">
        <List
          list={list}
          handleDelete={handleDelete}
          handleCheckbox={handleCheckbox}
          handleEditClick={handleEditClick}
        />
      </div>
    </>
  );
};
