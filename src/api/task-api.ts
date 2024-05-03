import axios from 'axios'

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
} 
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
} 
export type TaskData = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
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
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
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
    createTask(todolistId: string, task: TaskData) {
        return instanse.post<ResponseType<{item: TaskData}>>(`${todolistId}/tasks`, { task })
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instanse.put<ResponseType<{item: TaskData}>>(`${todolistId}/tasks/${taskId}`, { title })
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    }
}