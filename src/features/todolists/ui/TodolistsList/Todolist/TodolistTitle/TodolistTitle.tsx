import IconButton from "@mui/material/IconButton"
import { useDispatch } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../../../../../../common/components/EditableSpan";
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../../model/todolists-reducer";
import styles from './TodolistTitle.module.css';

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
        <div className={styles.container}>
            <h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler} /></h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}