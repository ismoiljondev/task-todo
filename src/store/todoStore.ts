import { create } from "zustand";
interface Todo {
  id: number;
  title: string;
  desc: string;
  status: "completed" | "notcompleted";
}

interface TododStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const useTodoStore = create<TododStore>((set) => ({
  todos:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("todos") || "[]")
      : [],
  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  removeTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo?.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  toggleStatus: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo?.id === id
          ? {
              ...todo,
              status:
                todo.status === "notcompleted" ? "completed" : "notcompleted",
            }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));

export default useTodoStore;
