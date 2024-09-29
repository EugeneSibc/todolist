import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { Grid } from "@mui/material"
import { RootState } from "../../../../app/store"
import { TodolistType } from "../../model/todolists-reducer"
import { addTaskAC } from "../../model/tasks-reducer"
import { useAppDispatch } from "../../../../common/components/hooks/useAppDispatch"
import { useAppSelector } from "../../../../common/components/hooks/useAppSelector"
import { selectTodolists } from "../../model/todolistsSelectors"

export const TodolistsLists = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<RootState, TodolistType[]>(selectTodolists)

    const addTask = (title: string, id: string) => {
        dispatch(addTaskAC({ title, todolistId:id }))
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
                        />
                    </Paper>
                )
            })}
        </Grid>
    )

}
