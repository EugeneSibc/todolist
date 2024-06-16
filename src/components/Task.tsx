import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from '@mui/icons-material';
import { TaskData, TaskStatuses } from '../api/tasks-api';
import { RequestStatusType } from '../state/app-reducer';

type TaskProps = {
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses, ) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    task: TaskData
    todolistId: string
    entityStatus: RequestStatusType
}

export const Task = React.memo((props: TaskProps) => {
    const onClickHandler = () => { props.removeTask(props.task.id, props.todolistId) }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress;
        props.changeStatus(props.todolistId, props.task.id, newIsDoneValue );
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue);
    },[props.changeTaskTitle, props.task.id, props.todolistId])
    let checked = props.task.status
    return <div  className={props.task.status ? "is-done" : ""}>
        {/* <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        /> */}
        <input type='checkbox' onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed} />
        <EditableSpan value={props.task.title} callBack={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler} disabled={props.entityStatus === 'loading'}>
            <Delete />
        </IconButton>
    </div>
})
