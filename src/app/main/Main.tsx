import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "../component/AddItemForm"
import { useDispatch } from "react-redux"
import { addTodolistAC, } from "../../state/todolists-reducer"
import { TodolistLists } from "./todolistLists/TodolistLists"

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Main = () => {
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: '30px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid>
                <TodolistLists />
            </Grid>
        </Container >
    )
}