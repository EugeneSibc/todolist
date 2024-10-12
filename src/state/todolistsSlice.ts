import { TodolistData, todolistsAPI } from "api/todolists-api"
import { Dispatch } from "redux"
import { appActions, RequestStatusType } from "state/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { fetchTasksTC } from "state/tasksSlice"
import { AppThunkDispatch } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistData & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistData }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.title = action.payload.title
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>,
    ) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>,
    ) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.entityStatus = action.payload.entityStatus
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistData[] }>) => {
      return action.payload.todolists.forEach((todo) => {
        state.push({ ...todo, filter: "all", entityStatus: "idle" })
      })
    },
    unloadTodolists: (state) => {
      return []
    },
  },
})

export const todolistsReducer = slice.reducer
export const {
  setTodolists,
  addTodolist,
  changeTodolistEntityStatus,
  removeTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  unloadTodolists,
} = slice.actions

export const fetchTodolistsTC = () => (dispatch: AppThunkDispatch) => {
  dispatch(appActions.setStatus("loading"))
  todolistsAPI
    .getTodolists()
    .then((res: { data: TodolistData[] }) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(appActions.setStatus("succeeded"))
      return res.data
    })
    .then((todos) => {
      todos.forEach((i) => dispatch(fetchTasksTC(i.id)))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  todolistsAPI.createTodolist(title).then((res) => {
    if (res.data.resultCode === 0) {
      const todolist = res.data.data.item
      dispatch(addTodolist({ todolist }))
      dispatch(appActions.setStatus("succeeded"))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  todolistsAPI
    .deleteTodolist(id)
    .then((res) => {
      dispatch(removeTodolist({ id }))
      dispatch(appActions.setStatus("succeeded"))
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch)
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }))
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  todolistsAPI
    .updateTodolist(id, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitle({ id, title }))
        dispatch(appActions.setStatus("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch)
    })
}
