import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";
import { CreateItemForm } from "./CreateItemForm";

export type FilterValues = "all" | "active" | "completed";
export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};
export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;
// [todolistId: string]: Task[];

export const App = () => {
  // Data
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn?", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS/TS", isDone: false },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "REDUX", isDone: false },
      { id: v1(), title: "REST API", isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
    ],
  });

  //todolist
  //C
  const createTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: Todolist = {
      id: newTodolistId,
      title,
      filter: "all",
    };
    const nextState: Todolist[] = [...todolists, newTodolist];
    setTodolists(nextState);
    const nextTaslsState: TasksState = { ...tasks, [newTodolistId]: [] };
    setTasks(nextTaslsState);
  };
  //U
  const changeTodolistTitle = (title: string, todolistId: string) => {
    const nextState: Todolist[] = todolists.map(tl =>
      tl.id === todolistId ? { ...tl, title } : tl
    );
    setTodolists(nextState);
  };
  const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
    const nextState: Todolist[] = todolists.map(tl =>
      tl.id === todolistId ? { ...tl, filter } : tl
    );
    setTodolists(nextState);
  };
  //D
  const deleteTodolist = (todolistId: string) => {
    const nextState: Todolist[] = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(nextState);
    const copyTasksState = { ...tasks };
    delete tasks[todolistId];
    setTasks(copyTasksState);
  };

  //tasks
  //C
  const createTask = (title: string, todolistId: string) => {
    const newTask: Task = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: [...tasks[todolistId], newTask],
    };
    setTasks(nextState);
  };
  //U
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone } : t)),
    };
    // const newState = todolistTasks.map((task) =>
    //   task.id == taskId ? { ...task, isDone } : task
    // );
    setTasks(nextState);
  };
  //U
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)),
    };
    setTasks(nextState);
  };
  //D
  const deleteTask = (taskId: string, todolistId: string) => {
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
    };
    setTasks(nextState);
  };

  const todolistItems = todolists.map(tl => {
    let filteredTasks = tasks[tl.id];
    if (tl.filter === "active") {
      filteredTasks = filteredTasks.filter(task => !task.isDone);
    }
    if (tl.filter === "completed") {
      filteredTasks = filteredTasks.filter(task => task.isDone);
    }

    return (
      <TodolistItem
        key={tl.id}
        title={tl.title}
        filter={tl.filter}
        todolistId={tl.id}
        tasks={filteredTasks}
        deleteTodolist={deleteTodolist}
        changeTodolistTitle={changeTodolistTitle}
        createTask={createTask}
        changeTaskTitle={changeTaskTitle}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        date={"02.01.2025"}
      />
    );
  });

  //UI
  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} />
      {todolistItems}
    </div>
  );
};
