import { ChangeEvent } from "react";
export type tTodo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export type tPomodoroContext = {
  setWorkMinutes: (n: number) => void;
  setBreakMinutes: (n: number) => void;
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  isWorkTime: boolean;
  setWorkTime: (n: boolean) => void;
};

export type tTodoContext = {
  items: tTodo[];
  todo: string;
  isEdit: boolean;
  handleChange: (key: ChangeEvent<HTMLTextAreaElement>) => void;
  handleDelete: (key: string) => void;
  handleCheckbox: (id: string, updatTodo: tTodo) => void;
  handleEditClick: (key: string) => void;
  handleSave: () => void;
};

export type tAction =
  | { type: "ADD_TODO"; payload: tTodo }
  | { type: "UPDATE_TODO"; payload: { id: string; updateTodo: tTodo } }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "INIT"; payload: tTodo[] };
