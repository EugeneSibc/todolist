import Paper from "@mui/material/Paper"
import { Todolist } from "./todolist/Todolist"
import { useDispatch, useSelector } from "react-redux"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "../../../state/tasks-reducer"
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../state/todolists-reducer"
import { FilterValuesType } from "../Main"
import { RootState } from "../../../state/store"
import { Grid } from "@mui/material"

export const TodolistLists = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

    

    const removeTodolist = (todolistId: string) => {
        
    }
    const addTask = (title: string, id: string) => {
        dispatch(addTaskAC({ title, todolistId:id }))
    }    

    const updateTodolist = (todolistId: string, title: string) => {
        
    }
    return (
        <Grid container spacing={1}>
            {todolists.map((tl) => {
                
                return (
                    <Paper sx={{ p: '0 20px 20px 20px' }} elevation={5}>
                        <Todolist
                            key={tl.id}
                            todolist={tl} 
                            addTask={addTask}                                                 
                            removeTodolist={removeTodolist}                           
                            updateTodolist={updateTodolist}
                        />
                    </Paper>
                )
            })}
        </Grid>
    )

}
