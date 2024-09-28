import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FilterValuesType } from "../main/Main"
import { changeTodolistFilterAC, TodolistType } from "../../state/todolists-reducer"
import { useDispatch } from "react-redux"
import { filterButtonsContainerSx } from "../main/todolistLists/todolist/Todolist.styles"

type Props = {
    todolist: TodolistType;
}

export const FilterTasksButtons = ({todolist}:Props) => {
    const dispatch = useDispatch()
    const {filter, id} = todolist
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({ filter, id }))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}
            >
                Completed
            </Button>
        </Box>
    )
}