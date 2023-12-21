import React, { useRef, useState, KeyboardEvent } from 'react';
import './../../App.css';
import Button from '../button/Button';
import { Input } from '../input/Input';
import autoAnimate from '@formkit/auto-animate'

export type FilterValueType = 'all' | 'active' | 'completed' | 'three'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    theme: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTasks: (title: string) => void
    // checkTask: (taskId: string) => void
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
        /* const onClickCheckedInput = () => {
             props.checkTask(task.id)
         }*/
        const onClickRemoveTaskInput = () => {
            props.removeTask(task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox" defaultChecked={task.isDone} />
                <span>{task.title}</span>
                <Button title="✖️"
                    onClickHandler={onClickRemoveTaskInput} />
            </li>
        )
    })

    const taskList: JSX.Element = props.tasks.length !== 0
        ? <ul>{listItem}</ul>
        : <span>Tasks list is empty</span>

    // const [title, setTitle] = useState('')

    // const onClickAddTitleHandler = () => {
    //     if(taskTitleInput.current){
    //        let newTaskTitle = taskTitleInput.current.value
    //        props.addTasks(newTaskTitle)
    //        taskTitleInput.current.value = ''
    //     }
    //     const trimmedTaskTitle = title.trim()
    //     trimmedTaskTitle 
    //     ? props.addTasks(title) 
    //     : alert('Введи значение!')
    //     setTitle('')
    // }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    // const [listRef] = useAutoAnimate<HTMLUListElement>()
    const taskTitleInput = useRef<HTMLInputElement>(null)


    const onClickAddTitleHandler = () => {
        if (taskTitleInput.current) {
            let newTaskTitle = taskTitleInput.current.value

            const trimmedTaskTitle = newTaskTitle.trim()
            trimmedTaskTitle
                ? props.addTasks(newTaskTitle)
                : alert('Введи значение!')
            taskTitleInput.current.value = ''
        }

    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitleInput.current) {
            let newTaskTitle = taskTitleInput.current.value
            if (event.key === "Enter" && newTaskTitle) {
                const trimmedTaskTitle = newTaskTitle.trim()
                trimmedTaskTitle
                    ? props.addTasks(newTaskTitle)
                    : alert('Введи значение!')
                taskTitleInput.current.value = ''
            }
        }
    }

    return (
        <div className="todolist">
            <h3>{props.theme}</h3>
            <div>
                <input ref={taskTitleInput}
                    onKeyDown={onKeyPressHandler} />
                {/* <Input title={title}
                    setTitle={setTitle}
                    addTasks={onClickAddTitleHandler}/> */}
                <Button title={'+'}
                    onClickHandler={onClickAddTitleHandler}
                // isDisabled={!newTaskTitle} 
                />
            </div>
            <ul >
                {taskList}
            </ul>
            <div>
                <Button title="All"
                    onClickHandler={onAllClickHandler} />
                <Button title="Active"
                    onClickHandler={onActiveClickHandler} />
                <Button title="Completed"
                    onClickHandler={onCompletedClickHandler} />
            </div>
        </div>
    );
}
function useAutoAnimate<T>(): [any] {
    throw new Error('Function not implemented.');
}

