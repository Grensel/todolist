import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { FilterButtons } from './FillterButtons/FillterButtons'
import { Todolist } from '@/features/todolists/model/todolists-reducer'
import { createTaskAC } from '@/features/todolists/model/tasks-reducer'
import { Tasks } from './Tasks/Tasks'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
