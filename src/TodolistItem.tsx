import { Button } from "./Button";

type TodolistItemPropsType = {
  title?: string;
  task: Array<TastkType>;
  date?: string;
};

export type TastkType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodolistItem = ({ title, task, date }: TodolistItemPropsType) => {
  // const taskList =
  //   props.task.length == 0 ? (
  //     <span>Your list is empty</span>
  //   ) : (
  //     <ul>
  //       {props.task.map((task: TastkType) => {
  //         return (
  //           <li>
  //             <input type="checkbox" checked={task.isDone} />
  //             <span>{task.title}</span>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );

  // const listItems: Array<JSX.Element> = props.task.map((task: TastkType) => {
  //   return (
  //     <li>
  //       <input type="checkbox" checked={task.isDone} />
  //       <span>{task.title}</span>
  //     </li>
  //   );
  // });

  const taskList =
    task.length === 0 ? (
      <span>Your list is empty</span>
    ) : (
      <ul>
        {task.map((task: TastkType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
            </li>
          );
        })}
      </ul>
    );

  return (
    <div className="todolist">
      <h3>{title || "What to learn"}</h3>
      <div>
        <input placeholder={"Write new task"} />
        <Button title={"+"} />
      </div>
      {taskList}
      <div>
        <Button title={"All"} />
        <Button title={"Active"} />
        <Button title={"Completed"} />
      </div>
      <div>{date}</div>
    </div>
  );
};
