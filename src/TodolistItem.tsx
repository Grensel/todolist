import { ChangeEvent } from "react";
import { FilterValues, Task } from "./App";
import { Button } from "./Button";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

type TodolistItemPropsType = {
  title: string;
  tasks: Task[];
  todolistId: string;
  filter: FilterValues;
  date?: string;
  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
  deleteTodolist: (todolistId: string) => void;
  createTask: (title: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  deleteTask: (taskId: string, todolistId: string) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  todolistId,
  date,
  deleteTask,
  createTask,
  changeTaskTitle,
  filter,
  changeTaskStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
}: TodolistItemPropsType) => {
  const createTaskHandler = (taskTitle: string) => {
    createTask(taskTitle, todolistId);
  };
  const createOnClickHandler = (filter: FilterValues) => () =>
    changeTodolistFilter(filter, todolistId);
  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(newTitle, todolistId);
  };

  const taskList =
    tasks.length === 0 ? (
      <span>Your list is empty</span>
    ) : (
      <ul>
        {tasks.map(task => {
          const deleteTaskHandler = () => {
            deleteTask(task.id, todolistId);
          };
          const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(task.id, newTitle, todolistId);
          };
          return (
            <li key={task.id} className={task.isDone ? "task-done" : "task"}>
              <input
                type={"checkbox"}
                checked={task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                }
              />
              {/* <span className={task.isDone ? "task-done" : "task"}>{task.title}</span> */}
              <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
              <Button title={"x"} onClickHandler={() => deleteTaskHandler()} />
            </li>
          );
        })}
      </ul>
    );

  return (
    <div className="todolist">
      <div style={{ display: "flex" }}>
        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
        <Button title={"x"} onClickHandler={() => deleteTodolist(todolistId)} />
      </div>
      {/* create tusk */}
      <CreateItemForm createItem={createTaskHandler} />
      {taskList}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClickHandler={createOnClickHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClickHandler={createOnClickHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClickHandler={createOnClickHandler("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
