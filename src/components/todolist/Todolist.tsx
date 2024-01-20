import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import Button from '../button/Button';
import { AddItemForm } from '../AddItemForm';
import { EditableSpan } from '../EditableSpan';
import { FilterValueType, TaskType } from '../../App';

type TodoListPropsType = {
    todolistId: string
    theme: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTasks: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filterValue: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeItem: (todolistId: string, taskId: string, title: string) => void
    changeTodosTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: TodoListPropsType) {
    let newFilteredTasks  = props.tasks    
    if (props.filterValue === 'active') {
        newFilteredTasks = props.tasks.filter(el => el.isDone === false)
    }
    if (props.filterValue === 'completed') {
        newFilteredTasks = props.tasks.filter(el => el.isDone === true)
    }

    const listItem: Array<JSX.Element> = newFilteredTasks.map((task) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue)
        }
        const onClickRemoveTaskInput = () => {
            props.removeTask(props.todolistId, task.id)
        }
        const changeItemHandler = (title: string) => {
            props.changeItem(props.todolistId, task.id, title)
        }
        return (
            <li key={task.id}
                className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeHandler} />
                <EditableSpan globalTitle={task.title}
                    callBack={changeItemHandler} />
                <Button title="✖️"
                    onClickHandler={onClickRemoveTaskInput} />
            </li>
        )
    })

    // const taskList: JSX.Element = tasksForTodolist.length !== 0
    //     ? <ul>{listItem}</ul>
    //     : <span>Tasks list is empty</span>

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const addItemHandler = (title: string) => {
        props.addTasks(props.todolistId, title)
    }
    const changeThemeHandler = (title: string,) => {
        props.changeTodosTitle(props.todolistId, title)
    }

    return (
        <div className="todolist">
            <div className="block">
                <h3><EditableSpan globalTitle={props.theme}
                    callBack={changeThemeHandler} /></h3>
                <Button title="✖️"
                    onClickHandler={onClickRemoveTodolist} />
            </div>
            <AddItemForm callBack={addItemHandler} />
            <ul>
                {/* {taskList} */}
                {listItem}
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