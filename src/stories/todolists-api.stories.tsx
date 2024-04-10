import React, { useEffect, useState } from 'react'
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
    useEffect(() => {
        todolistAPI.createTodolist('SET NEW TODOLIST')
            .then<any>(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const todolistId = '70631467-116c-4885-a0be-ab49817a92b3'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then<any>(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const todolistId = '70631467-116c-4885-a0be-ab49817a92b3'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'NEW TITLE')
            .then<any>(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}