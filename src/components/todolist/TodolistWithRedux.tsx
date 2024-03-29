import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType, TaskType } from './../../AppWithRedux';
import { AddItemForm } from './../AddItemForm';
import { EditableSpan } from './../EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../state/tasks-reducer';
import { changeFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../state/todolists-reducer';
import { Task } from '../Task';


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask:(title: string, todolistId: string) => void
    removeTask:(id: string, todolistId: string) => void
    changeStatus:(id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle:(id: string, newTitle: string, todolistId: string) => void
    changeFilter:(todolistId: string, value: FilterValuesType) => void
    removeTodolist:(id: string) => void
    changeTodolistTitle:(id: string, title: string) => void
}

export const TodolistWithRedux = React.memo((props: PropsType) => {
    console.log("Todolist called")
    // let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    // let dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    },[props.changeTodolistTitle,props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.changeFilter, props.id]);

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={props.title} callBack={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTask} />
        <div>
            {
                tasksForTodolist.map(t => 
                <Task 
                    key={t.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    task={t}
                    todolistId={props.id}
                />)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


