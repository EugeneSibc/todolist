import React, {  useCallback, useEffect } from 'react';
import { AddItemForm } from './../addItemForm/AddItemForm';
import { EditableSpan } from '../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { FilterValuesType } from '../../state/todolists-reducer';
import { Task } from '../Task';
import { TaskStatuses } from '../../api/tasks-api';
import { useAppDispatch } from '../../state/store';
import { TaskNewData, fetchTasksTC } from '../../state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { RequestStatusType } from '../../state/app-reducer';


type PropsType = {
    id: string
    title: string
    entityStatus:RequestStatusType
    tasks: TaskNewData[]
    filter: FilterValuesType
    addTask:(title: string, todolistId: string) => void
    removeTask:(id: string, todolistId: string) => void
    changeStatus:(todolistId: string, taskId: string, status: TaskStatuses ) => void
    changeTaskTitle:(todolistId: string, id: string, newTitle: string) => void
    changeFilter:(todolistId: string, value: FilterValuesType) => void
    removeTodolist:(id: string) => void
    changeTodolistTitle:(id: string, title: string) => void
}

export const TodolistWithRedux = (props: PropsType) => {
    // let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     console.log('7')
    //     dispatch(fetchTasksTC(props.id))
    //   }, [])

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
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.InProgress);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3> <EditableSpan value={props.title}
                        callBack={changeTodolistTitle}
                        disabled={props.entityStatus === 'loading'} />
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTask} disabled={props.entityStatus === 'loading'}/>
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
                    entityStatus={props.entityStatus}
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
}


