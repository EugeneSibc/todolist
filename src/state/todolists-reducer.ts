import { v1 } from "uuid"
import { TodolistData, todolistsAPI } from "../api/todolists-api"
import { Dispatch } from "redux"
import { ActionsType, RequestStatusType, setAppErrorAC, setAppStatusAC } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { fetchTasksTC } from "./tasks-reducer"
import { AppThunkDispatch } from "./store"

export type TodolistsReducerActionsType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeFilterACType
  | SetTodolistsAC
  | ChangeTodolistEntityStatusAC
  | UnloadTodolistsAC

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistData & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: TodolistsReducerActionsType,
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.id)
    }
    case "ADD-TODOLIST": {
      return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => (el.id === action.id ? { ...el, title: action.title } : el))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => (el.id === action.id ? { ...el, filter: action.filter } : el))
    }
    case "SET-TODOLISTS": {
      console.log("16")
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "CHANGE-ENTITY-STATUS": {
      return state.map((el) => (el.id === action.id ? { ...el, entityStatus: action.entityStatus } : el))
    }
    case "UNLOAD-TODOLISTS": {
      return (state = [])
    }
    default:
      return state
  }
}

export const fetchTodolistsTC = () => (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsAPI
    .getTodolists()
    .then((res: { data: TodolistData[] }) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
      return res.data
    })
    .then((todos) => {
      todos.forEach((i) => dispatch(fetchTasksTC(i.id)))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsAPI.createTodolist(title).then((res) => {
    if (res.data.resultCode === 0) {
      const todolist = res.data.data.item
      dispatch(addTodolistAC(todolist))
      dispatch(setAppStatusAC("succeeded"))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC(id, "loading"))
  todolistsAPI
    .deleteTodolist(id)
    .then((res) => {
      dispatch(removeTodolistAC(id))
      dispatch(setAppStatusAC("succeeded"))
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch)
      dispatch(changeTodolistEntityStatusAC(id, "failed"))
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsAPI
    .updateTodolist(id, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch)
    })
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    id,
  } as const
}
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistData) => {
  return {
    type: "ADD-TODOLIST",
    todolist,
  } as const
}
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title,
  } as const
}
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
  } as const
}
export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistData[]) => {
  return {
    type: "SET-TODOLISTS",
    todolists,
  } as const
}
type ChangeTodolistEntityStatusAC = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
  return {
    type: "CHANGE-ENTITY-STATUS",
    id,
    entityStatus,
  } as const
}
export type UnloadTodolistsAC = ReturnType<typeof unloadTodolistsAC>
export const unloadTodolistsAC = () => {
  return {
    type: "UNLOAD-TODOLISTS",
  } as const
}
