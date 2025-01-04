import "./App.css";
import { TastkType, TodolistItem } from "./TodolistItem";

export const App = () => {
  const todolistTasks: Array<TastkType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS/TS", isDone: false },
    { id: 3, title: "React", isDone: false },
  ];

  return (
    <div className="app">
      <TodolistItem
        title={"What to learn?"}
        task={todolistTasks}
        date={"02.01.2025"}
      />
    </div>
  );
};
