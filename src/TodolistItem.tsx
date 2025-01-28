import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, Task } from "./App";
import { Button } from "./Button";

type TodolistItemPropsType = {
  title: string;
  tasks: Task[];
  todolistId: string;
  filter: FilterValuesType;
  date?: string;
  deleteTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  createTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  deleteTodolist: (todolistId: string) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  todolistId,
  date,
  deleteTask,
  createTask,
  filter,
  changeFilter,
  changeTaskStatus,
  deleteTodolist,
}: TodolistItemPropsType) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      createTask(taskTitle, todolistId);
    } else {
      setError("Title is required");
    }
    setTaskTitle("");
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(event.currentTarget.value);
  };
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskTitle && !maxTtitleLengthError)
      createTaskHandler();
  };

  const createOnClickHandler = (filter: FilterValuesType) => () =>
    changeFilter(filter, todolistId);

  const taskList =
    tasks.length === 0 ? (
      <span>Your list is empty</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id, todolistId);
          };
          return (
            <li key={task.id}>
              <input
                type={"checkbox"}
                checked={task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
                }
              />
              <span className={task.isDone ? "task-done" : "task"}>
                {task.title}
              </span>
              <Button title={"x"} onClickHandler={() => deleteTaskHandler()} />
            </li>
          );
        })}
      </ul>
    );

  const maxTtitleLengthError: boolean = taskTitle.length > 10;

  return (
    <div className="todolist">
      <div style={{ display: "flex" }}>
        <h3>{title || "What to learn?"}</h3>
        <Button title={"x"} onClickHandler={() => deleteTodolist(todolistId)} />
      </div>
      <div>
        <input
          className={error ? "error" : ""}
          placeholder={"Write new task"}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button
          title={"+"}
          disabled={!taskTitle.length || maxTtitleLengthError}
          onClickHandler={createTaskHandler}
        />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {!taskTitle && <div>Enter title, please</div>}
      {taskTitle && !maxTtitleLengthError && (
        <div>Mx title length is 10 charters</div>
      )}
      {maxTtitleLengthError && (
        <div style={{ color: "red" }}>You title is to long</div>
      )}
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
