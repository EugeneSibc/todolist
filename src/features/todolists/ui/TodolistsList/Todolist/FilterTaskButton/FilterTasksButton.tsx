import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { changeTodolistFilterAC, FilterValuesType, TodolistType } from "../../../../model/todolists-reducer";
import { filterButtonsContainerSx } from "./FilterTaskButton.styles";
import { useAppDispatch } from "../../../../../../common/components/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType;
}

export const FilterTasksButtons = ({todolist}:Props) => {
    const dispatch = useAppDispatch()
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