import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "../component/AddItemForm"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../state/todolists-reducer"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "../../state/tasks-reducer"
import { Todolist } from "../features/Todolist"

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Main = () => {
    const dispatch = useDispatch()
	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
	
	

	const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone:taskStatus,todolistId}))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))   
    }
    const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC( { id: todolistId, title }))
    }

    return (<Container fixed>
        <Grid container sx={{ mb: '30px' }}>
            <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
            {todolists.map((tl) => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }

                return (
                    <Grid>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <Todolist
                                key={tl.id}
                                todolistId={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                updateTask={updateTask}
                                updateTodolist={updateTodolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </Container>)
}