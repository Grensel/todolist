import { useState } from "react";
import "./App.css";
import { TastkType, TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  // Data
  const todolistTitle = "What to learn?";

  const [todolistTasks, setTodolistTasks] = useState<Array<TastkType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "REDUX", isDone: false },
    { id: v1(), title: "REST API", isDone: false },
  ]);

  const deleteTask = (taskId: string) => {
    setTodolistTasks(todolistTasks.filter((t) => t.id !== taskId));
  };

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const getFilteredTasks = (
    tasks: Array<TastkType>,
    filterValues: FilterValuesType
  ): Array<TastkType> => {
    switch (filterValues) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  };

  const changeTodolistFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const createTask = (title: string) => {
    const newTask: TastkType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TastkType[] = [newTask, ...todolistTasks];
    setTodolistTasks(nextState);
  };

  //UI
  return (
    <div className="app">
      <TodolistItem
        title={todolistTitle}
        task={getFilteredTasks(todolistTasks, filter)}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        createTask={createTask}
        date={"02.01.2025"}
      />
    </div>
  );
};
