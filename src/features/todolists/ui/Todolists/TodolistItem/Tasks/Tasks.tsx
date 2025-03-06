
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectTasks } from '@/features/todolists/model/tasks.selector'
import { Todolist } from '@/features/todolists/model/todolists-reducer'
import List from '@mui/material/List'
import { TuskItem } from './TuskItem/TaskItem'

type Props = {
  todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist


  const task = useAppSelector(selectTasks)

  const todolistTasks = task[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map(task => (
            <TuskItem key={task.id} todolistId={todolist.id} task={task} />
          ))}
        </List>
      )}
    </>
  )
}