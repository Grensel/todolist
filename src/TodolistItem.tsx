import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./Button";

type TodolistItemPropsType = {
  title?: string;
  task: Array<TastkType>;
  date?: string;
  deleteTask: (taskId: string) => void;
  createTask: (title: string) => void;
  changeTodolistFilter: (filter: FilterValuesType) => void;
};

export type TastkType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodolistItem = ({
  title,
  task,
  date,
  deleteTask,
  createTask,
  changeTodolistFilter,
}: TodolistItemPropsType) => {
  const taskList =
    task.length === 0 ? (
      <span>Your list is empty</span>
    ) : (
      <ul>
        {task.map((task: TastkType) => {
          const deleteTaskHandler = () => {
            deleteTask(task.id);
          };
          return (
            <li key={task.id}>
              <input type={"checkbox"} checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={"x"} onClickHandler={() => deleteTaskHandler()} />
            </li>
          );
        })}
      </ul>
    );

  const [taskTitle, setTaskTitle] = useState<string>("");

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskTitle && !maxTtitleLengthError)
      createTaskHandler();
  };

  const createOnClickHandler = (filter: FilterValuesType) => () =>
    changeTodolistFilter(filter);

  const createTaskHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  };

  const maxTtitleLengthError: boolean = taskTitle.length > 10;

  return (
    <div className="todolist">
      <h3>{title || "What to learn?"}</h3>
      <div>
        <input
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
        <Button title={"All"} onClickHandler={createOnClickHandler("all")} />
        <Button
          title={"Active"}
          onClickHandler={createOnClickHandler("active")}
        />
        <Button
          title={"Completed"}
          onClickHandler={createOnClickHandler("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
