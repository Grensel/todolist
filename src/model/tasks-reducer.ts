import { v1 } from "uuid";
import type { TasksState } from "../App";
import { create_todolist, CreateTodolistActionType, delete_todolist, DeleteTodolistActionType } from "./todolists-reducer";
const initialState: TasksState = {};

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType = DeleteTodolistActionType | CreateTodolistActionType | DeleteTaskActionType | CreateTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

  const delete_task = "delete_task"
  const create_task = "create_task"
  const change_task_status = "change_task_status"
  const change_task_title = "change_task_title"

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType): TasksState => {
  switch (action.type) {
    case delete_todolist: {
      const copytasksState = { ...tasks };
      delete copytasksState[action.payload.id];
      return copytasksState;
    };
    case create_todolist: {
      return { ...tasks, [action.payload.id]: [] };
    };
    case delete_task: {
      return { ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
    };
    case create_task: {
      const newTask = { id: v1(), title: action.payload.title, isDone: false }
      return { ...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]] }
    }
    case change_task_status: {
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => (task.id == action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task))
      }
    }
    case change_task_title: {
      return {
        ...tasks,
        [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => (task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task)),
      }
    }
    default:
      return tasks;
  }
};

  export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => (
    { type: delete_task, payload } as const
  )

  export const createTaskAC = (payload: {todolistId: string, title: string}) => (
    {type: create_task, payload} as const
  )

  export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => (
    {type: change_task_status, payload} as const
  )
  
  export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => (
    {type: change_task_title, payload} as const
  )
