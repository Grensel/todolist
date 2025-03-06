import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase( deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase( createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase( deleteTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = state[action.payload.todolistId].findIndex(t=> t.id === action.payload.taskId)
      if(index !== -1){
        tasks.splice( index, 1 )
      }
    })
    .addCase( createTaskAC, (state, action) => {
      const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
      if (state[action.payload.todolistId]) {
        state[action.payload.todolistId].unshift(newTask)
      }
    })
    .addCase( changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase( changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
})

