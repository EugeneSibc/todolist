import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "../common/components/AddItemForm"
import { addTodolistAC } from "../features/todolists/model/todolists-reducer"
import { TodolistsLists } from "../features/todolists/ui/TodolistsList/TodolistsList"
import { useAppDispatch } from "../common/components/hooks/useAppDispatch"


export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: '30px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid>
                <TodolistsLists />
            </Grid>
        </Container >
    )
}