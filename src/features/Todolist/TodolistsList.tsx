import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AddItemForm } from '../../components/addItemForm/AddItemForm';
import { TodolistWithRedux } from '../../components/todolist/TodolistWithRedux';
import { useSelector } from 'react-redux';
import { addTodolistTC, changeFilterAC, changeTodolistTitleTC, FilterValuesType, removeTodolistTC, TodolistDomainType } from '../../state/todolists-reducer';
import { AppRootStateType, useAppDispatch } from '../../state/store';
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from '../../state/tasks-reducer';
import { TaskStatuses } from '../../api/tasks-api';
import { Navigate } from 'react-router-dom';



export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLogedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(id, todolistId))
    }, [])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, { status }))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, id: string, title: string,) => {
        dispatch(updateTaskTC(todolistId, id, { title }))
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistTC(id);
        dispatch(action);
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title);
        dispatch(action);
    }, [])

    if(!isLogedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm callBack={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        return <Grid key={tl.id} item>
                            <Paper style={{ padding: "10px" }}>
                                <TodolistWithRedux
                                    id={tl.id}
                                    title={tl.title}
                                    entityStatus={tl.entityStatus}
                                    tasks={tasksForTodolist}
                                    filter={tl.filter}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
}
