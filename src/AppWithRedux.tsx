import React, { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './state/store';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from '@mui/material/AppBar/AppBar';
import Menu from "@mui/icons-material/Menu";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { RequestStatusType } from './state/app-reducer';
import Box from '@mui/material/Box';
import ErrorSnackbar from './components/errorSnackbar/ErrorSnackbar';
import { TodolistsList } from './features/Todolist/TodolistsList';
import { Login } from './features/Login/Login';
import { fetchTodolistsTC } from './state/todolists-reducer';
import { Navigate, Route, Routes } from 'react-router-dom';


export function AppWithRedux() {
    
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

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
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>Page not found (404)</h1>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                </Routes>               
            </Container>
        </div>
    );
}


