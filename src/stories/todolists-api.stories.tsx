import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { todolistsAPI } from '../api/todolists-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        console.log(state)
        todolistsAPI.createTodolist(value)
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistsAPI.deleteTodolist(todolistId)
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistsAPI.updateTodolist(todolistId, value)
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