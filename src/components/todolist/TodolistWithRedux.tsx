import React, {ChangeEvent, useCallback} from 'react';
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


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType    
}

export function TodolistWithRedux(props: PropsType) {
    console.log("Todolist called") 
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    let dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [])
    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }
    
    const onAllClickHandler = () => dispatch(changeFilterAC(props.id, "all"));
    const onActiveClickHandler = () => dispatch(changeFilterAC(props.id, "active"));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(props.id, "completed"));

    
    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
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
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    }
                    
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/* <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        /> */}
                        <input type='checkbox' onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan value={t.title} callBack={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
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
}


