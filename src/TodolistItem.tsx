import { FilterValuesType } from "./App";
import { Button } from "./Button";

type TodolistItemPropsType = {
  title?: string;
  task: Array<TastkType>;
  date?: string;
  deleteTask: (taskId: number) => void;
  changeTodolistFilter: (filter: FilterValuesType) => void;
};

export type TastkType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodolistItem = ({
  title,
  task,
  date,
  deleteTask,
  changeTodolistFilter,
}: TodolistItemPropsType) => {
  const taskList =
    task.length === 0 ? (
      <span>Your list is empty</span>
    ) : (
      <ul>
        {task.map((task: TastkType) => {
          return (
            <li key={task.id}>
              <input type={"checkbox"} checked={task.isDone} />
              <span>{task.title}</span>
              <Button title={"x"} onClickhandler={() => deleteTask(task.id)} />
            </li>
          );
        })}
      </ul>
    );

  const createOnCkickHandler = (filter: FilterValuesType) => () =>
    changeTodolistFilter(filter);

  return (
    <div className="todolist">
      <h3>{title || "What to learn?"}</h3>
      <div>
        <input placeholder={"Write new task"} />
        <Button title={"+"} />
      </div>
      {taskList}
      <div>
        <Button title={"All"} onClickhandler={createOnCkickHandler("all")} />
        <Button
          title={"Active"}
          onClickhandler={createOnCkickHandler("active")}
        />
        <Button
          title={"Completed"}
          onClickhandler={createOnCkickHandler("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
