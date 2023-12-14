import React from 'react';
import './App.css';
import Button from './Button';

export type FilterValueType = 'all' | 'active' | 'completed' | 'three'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValueType) => void
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

    const listItem: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" defaultChecked={task.isDone}/>
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
                    onClickHandler={() => { props.changeFilter('all') }} />
                <Button title="Active"
                    onClickHandler={() => { props.changeFilter('active') }} />
                <Button title="Completed"
                    onClickHandler={() => { props.changeFilter('completed') }} />
            </div>
        </div>
    );
}
