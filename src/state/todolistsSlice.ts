import { TodolistData, todolistsAPI } from "api/todolists-api"
import { appActions, RequestStatusType } from "state/appSlice"
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "utils/create-app-async-thunk"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistData & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
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
    unloadTodolists: () => {
      return []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((todo) => {
          state.push({ ...todo, filter: "all", entityStatus: "idle" })
        })
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        })
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
  },
})

//create thunks
const fetchTodolistsTC = createAppAsyncThunk<
  { todolists: TodolistData[] },
  undefined
>(`${slice.name}/fetchTodolists`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))
    const res = await todolistsAPI.getTodolists()
    dispatch(appActions.setStatus("succeeded"))
    return { todolists: res.data }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  }
})

const addTodolistTC = createAppAsyncThunk<
  { todolist: TodolistData },
  { title: string }
>(`${slice.name}/addTodolist`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))
    const res = await todolistsAPI.createTodolist(arg)
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus("succeeded"))
      return { todolist: res.data.data.item }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  }
})

const removeTodolistTC = createAppAsyncThunk<
  { id: string },
  { id: string }
>(
  `${slice.name}/removeTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setStatus("loading"))
      const res = await todolistsAPI.deleteTodolist(arg)
      dispatch(appActions.setStatus("succeeded"))
      return arg
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      dispatch(changeTodolistEntityStatus({ ...arg, entityStatus: "failed" }))
      return rejectWithValue(null)
    }
  },
)

export const todolistsReducer = slice.reducer
export const {
  changeTodolistEntityStatus,
  changeTodolistTitle,
  changeTodolistFilter,
  unloadTodolists,
} = slice.actions
export const todolistsThunks = {
  fetchTodolistsTC,
  addTodolistTC,
  removeTodolistTC,
}
