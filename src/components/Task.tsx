import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from '@mui/icons-material';
import { TaskData, TaskStatuses } from '../api/tasks-api';

type TaskProps = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses, ) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskData
    todolistId: string
}

export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => { props.removeTask(props.task.id, props.todolistId) }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress;
        props.changeStatus(props.todolistId, props.task.id, newIsDoneValue );
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props.changeTaskTitle, props.task.id, props.todolistId])

    return <div  className={props.task.completed ? "is-done" : ""}>
        {/* <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        /> */}
        <input type='checkbox' onChange={onChangeHandler} checked={props.task.completed} />
        <EditableSpan value={props.task.title} callBack={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
