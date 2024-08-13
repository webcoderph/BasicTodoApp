import { ChangeEvent } from "react";
export type tTodo = {
  id: string;
  title: string;
  done: Boolean;
  createdAt: string;
};

export type tTodoContext = {
  items: tTodo[];
  todo: string;
  isEdit: boolean;
  handleChange: (key: ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (key: string) => void;
  handleCheckbox: (index: number, updatTodo: tTodo) => void;
  handleEditClick: (key: string) => void;
  handleSave: () => void;
};
