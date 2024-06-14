import React, { useCallback, useEffect } from 'react';
import './App.css';
import { AddItemForm } from './components/addItemForm/AddItemForm';
import { FilterValuesType, TodolistDomainType, addTodolistAC, addTodolistTC, changeFilterAC, changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistAC, removeTodolistTC } from './state/todolists-reducer';
import { TasksStateType, addTaskAC, addTaskTC, removeTaskAC, removeTaskTC, updateTaskTC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, AppThunkDispatch, useAppDispatch } from './state/store';
import { TodolistWithRedux } from './components/todolist/TodolistWithRedux';
import { TaskStatuses } from './api/tasks-api';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar/AppBar';
import Menu from "@mui/icons-material/Menu";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { RequestStatusType } from './state/app-reducer';
import Box from '@mui/material/Box';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';


export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
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

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {
                    status === 'loading' &&
                    <Box sx={{
                        width: '100%',
                        position: 'fixed'
                    }}>
                        <LinearProgress />
                    </Box>
                }
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}


