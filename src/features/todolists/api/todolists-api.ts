import axios from "axios"
import { AxiosResponse } from "axios"
import { LoginData } from "features/auth/ui/Login"

export type TodolistData = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type AuthType = {
  id: number
  email: string
  login: string
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "80165270-2247-469b-804e-2f4f4cafc85a",
  },
})

export const authAPI = {
  me() {
    return instanse.get<ResponseType<AuthType>, AxiosResponse<ResponseType<AuthType>>>(`auth/me`)
  },
  login(data: LoginData) {
    return instanse.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginData
    >(`auth/login`, data)
  },
  logout() {
    return instanse.delete<ResponseType>(`auth/login`)
  },
}

export const todolistsAPI = {
  getTodolists() {
    return instanse.get<TodolistData[]>(`/todo-lists`)
  },
  createTodolist(arg: { title: string }) {
    const { title } = arg
    return instanse.post<ResponseType<{ item: TodolistData }>>(`/todo-lists`, { title })
  },
  deleteTodolist(arg: { id: string }) {
    return instanse.delete<ResponseType>(`todo-lists/${arg.id}`)
  },
  updateTodolist(arg: { todolistId: string; title: string }) {
    return instanse.put<ResponseType>(`/todo-lists/${arg.todolistId}`, arg.title)
  },
}
