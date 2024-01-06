import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import Button from '../button/Button';
import { Input } from '../input/Input';

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateTupe = {
    [key: string]: Array<TaskType>
}

type TodoListPropsType = {
    todolistId: string
    theme: string
    tasks: TaskStateTupe
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTasks: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filterValue: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    let allTodolistTasks = props.tasks[props.todolistId]
    let tasksForTodolist = allTodolistTasks

    if (props.filterValue === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }
    if (props.filterValue === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }


    const listItem: Array<JSX.Element> = tasksForTodolist.map((task) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue)
        }
        const onClickRemoveTaskInput = () => {
            props.removeTask(props.todolistId, task.id)
        }
        return (
            <li key={task.id}
                className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeHandler} />
                <span>{task.title}</span>
                <Button title="✖️"
                    onClickHandler={onClickRemoveTaskInput} />
            </li>
        )
    })

    const taskList: JSX.Element = tasksForTodolist.length !== 0
        ? <ul>{listItem}</ul>
        : <span>Tasks list is empty</span>

    const onClickAddTitleHandler = () => {
        if (title.trim() !== '') {
            props.addTasks(props.todolistId, title.trim())
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const addNewTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const addTaskKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && title) {
            props.addTasks(props.todolistId, title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    // const onChangeInputHandler = () => {
    //     addNewTitle()
    // }
    // const onKeyDownHandler = () => {
    //     addTaskKeyDown()
    // }
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className="todolist">
            <div className="block">
                <h3>{props.theme}</h3>
                <Button title="✖️"
                    onClickHandler={onClickRemoveTodolist} />
            </div>
            <div>
                <Input title={title}
                    onChangeInputHandler={addNewTitle}
                    onKeyDownHandler={addTaskKeyDown}
                    classes={error ? "error" : ''} />
                <Button title={'+'}
                    onClickHandler={onClickAddTitleHandler}
                // isDisabled={!newTaskTitle}
                />
                {error && <div className='error-message'>'Title is required'</div>}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button title="All"
                    onClickHandler={onAllClickHandler}
                    classes={props.filterValue === 'all' ? 'active-filter' : ''} />
                <Button title="Active"
                    onClickHandler={onActiveClickHandler}
                    classes={props.filterValue === 'active' ? 'active-filter' : ''} />
                <Button title="Completed"
                    onClickHandler={onCompletedClickHandler}
                    classes={props.filterValue === 'completed' ? 'active-filter' : ''} />
            </div>
        </div>
    );
}



