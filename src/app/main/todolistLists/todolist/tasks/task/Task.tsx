import ListItem from "@mui/material/ListItem"
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "../../../../../component/EditableSpan";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "../../../../../../state/tasks-reducer";
import { getListItemSx } from "../../Todolist.styles";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton"
import { TodolistType } from "../../../../../../state/todolists-reducer";
import { ChangeEvent } from "react";


type Props = {
    task: TaskType
    todolist: TodolistType
}
export const Task = ({ task, todolist }: Props) => {
    const dispatch = useDispatch()   
    

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ taskId:task.id, todolistId:todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ taskId: task.id, isDone: newStatusValue, todolistId:todolist.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ todolistId:todolist.id, taskId:task.id, title }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}