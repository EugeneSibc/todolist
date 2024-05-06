import React, { Reducer, useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import { Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { FilterValuesType, TodolistDomainType, TodolistsReducerActionsType, addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { TasksReducerActionsType, TasksStateType, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { TaskPriorities, TaskStatuses } from './api/task-api';


export function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer<Reducer<TodolistDomainType[], TodolistsReducerActionsType>>(todolistsReducer, [
        {
            id: todolistId1, title: "What to learn", filter: "all", addedDate: new Date,
            order: 0
        },
        {
            id: todolistId2, title: "What to buy", filter: "all", addedDate: new Date,
            order: 0
        }
    ])

    let [tasks, dispatchToTasksReducer] = useReducer<Reducer<TasksStateType, TasksReducerActionsType>>(tasksReducer, {
        [todolistId1]: [
            {
                description: '',
                title: 'HTML&CSS',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: new Date,
            },
            {
                description: '',
                title: 'JS',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: new Date,
            }
        ],
        [todolistId2]: [
            {
                description: '',
                title: 'Milk',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'Milk',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todolistId1,
                order: 0,
                addedDate: new Date
            }
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistsReducer(changeFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, title))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm callBack={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{ padding: "10px" }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
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


