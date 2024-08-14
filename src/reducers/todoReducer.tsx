import { tTodo, tAction } from "../types";
export const todoReducer = (state: tTodo[], action: tAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload].sort((a, b) =>
        a.done === b.done ? 0 : a.done ? 1 : -1,
      );
    case "UPDATE_TODO":
      return state
        .map((item: tTodo) => {
          if (item.id === action.payload.id) return action.payload.updateTodo;
          else return item;
        })
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
    case "DELETE_TODO":
      return state
        .filter((item) => item.id !== action.payload)
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
    case "INIT":
      return action.payload;
    default:
      return state;
  }
};
