import axios from "axios"
import { AxiosResponse } from "axios"
import { BaseResponseType } from "common/types/types"
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
  // export type ResponseType<D = {}> = {
  //   resultCode: number
  //   messages: string[]
  //   data: D
  // }
  

const instanse = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
      "API-KEY": "80165270-2247-469b-804e-2f4f4cafc85a",
    },
  })

export const authAPI = {
    me() {
      return instanse.get<BaseResponseType<AuthType>, AxiosResponse<BaseResponseType<AuthType>>>(`auth/me`)
    },
    login(data: LoginData) {
      return instanse.post<
      BaseResponseType<{ userId: number }>,
        AxiosResponse<BaseResponseType<{ userId: number }>>,
        LoginData
      >(`auth/login`, data)
    },
    logout() {
      return instanse.delete<BaseResponseType>(`auth/login`)
    },
  }