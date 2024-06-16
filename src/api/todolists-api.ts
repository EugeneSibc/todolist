import axios from 'axios'

export type TodolistData = {
    id: string
    addedDate: Date
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


const instanse = axios.create({ 
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '80165270-2247-469b-804e-2f4f4cafc85a'
    },
})

export const todolistsAPI = {
    getTodolists() {
        return instanse.get<TodolistData[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{item: TodolistData}>>(`/todo-lists`, { title })
    },
    deleteTodolist(todolistId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instanse.put<ResponseType>(`/todo-lists/${todolistId}`, { title: title })
    },
}