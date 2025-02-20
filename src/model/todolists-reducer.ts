import { v1 } from "uuid";
import { FilterValues, Todolist } from "../App";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

type ActionType =
  | DeleteTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

  export const delete_todolist = 'delete_todolist'
  export const create_todolist = 'create_todolist'
  const change_todolist = 'change_todolist'
  const change_todolist_filter = 'change_todolist_filter'

export const todolistsReducer = (todolists: Todolist[], action: ActionType): Todolist[] => {
  switch (action.type) {
    case delete_todolist: {
      return todolists.filter(todolist => todolist.id !== action.payload.id);
    }
    case create_todolist: {
      const newTodolist: Todolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      };
      return [...todolists, newTodolist];
    }
    case change_todolist: {
      return todolists.map(tl =>
        tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl
      );
    }
    case change_todolist_filter: {
      return todolists.map(tl =>
        tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
      );
    }
    default:
      return todolists;
  }
};

export const deleteTodolistAC = (id: string) =>
  ({ type: delete_todolist, payload: { id } } as const);

export const createTodolistAC = (title: string) =>
  ({ type: create_todolist, payload: { id: v1(), title } } as const);

export const changeTodolistTitleAC = (payload: { id: string; title: string }) =>
  ({ type: change_todolist, payload } as const);

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) =>
  ({ type: change_todolist_filter, payload } as const);
