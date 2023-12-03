import React from 'react';
import './App.css';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export function Todolist(props: TodoListPropsType) {
    // const listItems: Array<JSX.Element> = []
    // for(let i =0; i < props.tasks.length; i++){
    //     const listItem:JSX.Element = <li>
    //     <input type="checkbox" checked={props.tasks[i].isDone} />
    //     <span>{props.tasks[i].title}</span>
    //     <button onClick={()=>{props.removeTask(props.tasks[i].id)}}>X</button>
    // </li>
    // listItems.push(listItem)
    // }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" defaultChecked={task.isDone} />
                            <span>{task.title}</span>
                            <button onClick={() => { props.removeTask(task.id) }}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
