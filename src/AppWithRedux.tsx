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
import { fetchTodolistsTC } from './state/todolists-reducer';
import { Outlet } from 'react-router-dom';
import { meTC } from './state/auth-reducer';


export function AppWithRedux() {
    
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    useEffect(() => {
        dispatch(meTC())
    },[])

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
                <Outlet/>          
            </Container>
        </div>
    );
}


