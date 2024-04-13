import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    // useEffect(() => {
    //     todolistAPI.createTodolist(value)
    //         .then(res => { setState(res.data) })
    // }, [])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        console.log(state)
        todolistAPI.createTodolist(value)
            .then(res => { setState(res.data) })
            setValue('')
    }
    return (
        <div>
            <div>
                <input onChange={onChangeHandler} value={value}/>
                <button onClick={onClickHandler}>SET</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    // useEffect(() => {
    //     todolistAPI.deleteTodolist(todolistId)
    //         .then(res => { setState(res.data) })
    // }, [])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => { setState(res.data) })
            setTodolistId('')   
    }
    return <div>
        <div>
            <input onChange={onChangeHandler} value={todolistId}/>
            <button onClick={onClickHandler}>DELETE</button>
        </div>
        {JSON.stringify(state)}
    </div>
}

export const UpdateTodolistTitle = () => {
    const [todolistId, setTodolistId] = useState<string>('TodolistId')
    const [value, setValue] = useState<string>('Title')
    const [state, setState] = useState<any>(null)
    // useEffect(() => {
    //     todolistAPI.updateTodolist(todolistId, value)
    //         .then(res => { setState(res.data) })
    // }, [])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistAPI.updateTodolist(todolistId, value)
            .then(res => { setState(res.data) })            
    }
    return <div>
        <div>
            <input onChange={onChangeHandler} placeholder={todolistId}/>
            <input onChange={onChangeTitleHandler} placeholder={value}/>
            <button onClick={onClickHandler}>UPDATE</button>
        </div>
        {JSON.stringify(state)}
        </div>
}