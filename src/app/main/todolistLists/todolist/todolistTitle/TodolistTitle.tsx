import IconButton from "@mui/material/IconButton"
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../../../state/todolists-reducer"
import { EditableSpan } from "../../../../component/EditableSpan"
import { useDispatch } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';


type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
    const dispatch = useDispatch()
    
    const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(todolist.id))
	}
    const updateTodolistHandler = (title: string) => {
		dispatch(changeTodolistTitleAC({ id: todolist.id, title }))
	}
    return (
        <div className={"todolist-title-container"}>
            <h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler} /></h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}