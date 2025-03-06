import type { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task } from '@/features/todolists/model/tasks-reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { getListItemSx } from './TaskItem.styles'

type Props = {
  todolistId: string
  task: Task
}

export const TuskItem = ({ todolistId, task }: Props) => {

  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: newStatusValue }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}