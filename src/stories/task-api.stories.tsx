import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { taskAPI } from '../api/task-api'

export default {
    title: 'API',
}

export const GetTasks = () => {
    const todolistId = 'f079c559-77d9-4fee-832a-1d0c1a4193fb'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTask(todolistId)
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const todolistId = 'f079c559-77d9-4fee-832a-1d0c1a4193fb'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask(todolistId, 'SET NEW TASK')
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const todolistId = 'f079c559-77d9-4fee-832a-1d0c1a4193fb'
    const taskId = '51569a45-6183-4388-aa18-e31b9d9a1805'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, 'CHANGE TITLE TASK')
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const todolistId = 'f079c559-77d9-4fee-832a-1d0c1a4193fb'
    const taskId = '4169d0d9-81fe-46ab-aea3-3c40a9e981d4'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => { setState(res.data) })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}