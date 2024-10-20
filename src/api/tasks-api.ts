import axios from "axios"
import { UpdateTaskArgs } from "state/tasksSlice"

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
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
export type GetTask = {
  items: TaskData[]
  totalCount: number
  error: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: {
    "API-KEY": "80165270-2247-469b-804e-2f4f4cafc85a",
  },
})

export const tasksAPI = {
  getTask(todolistId: string) {
    return instanse.get<GetTask>(`${todolistId}/tasks`)
  },
  createTask(arg: CreateTaskArg) {
    const { title, todolistId } = arg
    return instanse.post<ResponseType<{ item: TaskData }>>(
      `${todolistId}/tasks`,
      { title },
    )
  },
  updateTask(arg: UpdateTaskArgs) {
    return instanse.put<ResponseType<{ item: TaskData }>>(
      `${arg.todolistId}/tasks/${arg.taskId}`,
      arg.domainModel,
    )
  },
  deleteTask(arg: { todolistId: string; taskId: string }) {
    return instanse.delete<ResponseType>(
      `${arg.todolistId}/tasks/${arg.taskId}`,
    )
  },
}

type CreateTaskArg = { title: string; todolistId: string }
