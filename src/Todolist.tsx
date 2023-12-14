import React, { useState } from 'react';
import './App.css';
import Button from './Button';

type FilterValueType = 'all' | 'active' | 'completed' | 'trio'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    deleteAllTasks: () => void
}

export function Todolist(props: TodoListPropsType) {
    // const listItems: Array<JSX.Element> = []
    // for(let i =0; i < props.tasks.length; i++){
    //     const listItem:JSX.Element = <li key={i}>
    //     <input type="checkbox" defaultChecked={props.tasks[i].isDone} />
    //     <span>{props.tasks[i].title}</span>
    //     <button onClick={()=>{props.removeTask(props.tasks[i].id)}}>X</button>
    // </li>
    // listItems.push(listItem)
    // }

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')

    // let tasksForTodolist = filterValue === 'active'
    //     ? tasks.filter(task => task.isDone === false)
    //     : filterValue === 'completed'
    //         ? tasks.filter(task => task.isDone === true)
    //         : tasks

    // let tasksForTodolist = tasks
    // if (filterValue === 'active') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === false)
    // }
    // if (filterValue === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === true)
    // }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValueType): Array<TaskType> => {
        return filterValue === 'active'
            ? tasks.filter(task => task.isDone === false)
            : filterValue === 'completed'
                ? tasks.filter(task => task.isDone === true)
                : filterValue === 'trio'
                    ? tasks.filter(t => t.id <= 3)
                    : tasks
    }

    const changeFilter = (filterValue: FilterValueType) => {
        setFilterValue(filterValue)
    }

    const listItem: Array<JSX.Element> = getFilteredTasks(props.tasks, filterValue).map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" defaultChecked={task.isDone} />
                <span>{task.title}</span>
                <Button title="✖️"
                    onClickHandler={() => { props.removeTask(task.id) }} />
            </li>
        )
    })

    const taskList: JSX.Element = props.tasks.length !== 0
        ? <ul>{listItem}</ul>
        : <span>Tasks list is empty</span>

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>"+"</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <Button title="All"
                    onClickHandler={() => { changeFilter('all') }} />
                <Button title="Active"
                    onClickHandler={() => { changeFilter('active') }} />
                <Button title="Completed"
                    onClickHandler={() => { changeFilter('completed') }} />
                <Button title="Trio"
                    onClickHandler={() => { changeFilter('trio') }} />
            </div>
            <Button title="Delete All Tasks"
                onClickHandler={() => { props.deleteAllTasks() }} />
        </div>
    );
}
