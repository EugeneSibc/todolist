import axios from 'axios'

type TaskData = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
type GetTask = {
    items: TaskData[]
    totalCount: number
    error: string
}
type CreateTaskType = {
    data: {
        item: TaskData
    }
    resultCode: number
    messages: string[]
}
type UpdateTaskType = {
    data: {
        item: TaskData
    }
    resultCode: number
    messages: string[]
}
type DeleteTaskType = {
    resultCode: number
    messages: string[]
    data: string
}
const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '80165270-2247-469b-804e-2f4f4cafc85a'
    },
})

export const taskAPI = {
    getTask(todolistId: string) {
        return instanse.get<GetTask>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instanse.post<CreateTaskType>(`${todolistId}/tasks`, { title })
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instanse.put<CreateTaskType>(`${todolistId}/tasks/${taskId}`, { title })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<CreateTaskType>(`${todolistId}/tasks/${taskId}`)
    }
}