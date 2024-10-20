import {
  TaskData,
  TaskPriorities,
  tasksAPI,
  TaskStatuses,
  UpdateTaskModelType,
} from "api/tasks-api"
import { appActions, RequestStatusType } from "state/appSlice"
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils"
import {
  addTodolist,
  removeTodolist,
  setTodolists,
  unloadTodolists,
} from "state/todolistsSlice"
import { TodolistData } from "api/todolists-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "utils/create-app-async-thunk"

export type TaskNewData = TaskData & {
  entityTaskStatus: RequestStatusType
}
export type TasksStateType = {
  [key: string]: Array<TaskNewData>
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeEntityTaskStatus: (
      state,
      action: PayloadAction<{
        todolistId: string
        taskId: string
        entityTaskStatus: RequestStatusType
      }>,
    ) => {
      const tasksForTodolist = state[action.payload.todolistId]
      const task = tasksForTodolist.find((t) => t.id === action.payload.taskId)
      if (task) task.entityTaskStatus = action.payload.entityTaskStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.task.todoListId]
        tasksForTodolist.unshift({
          ...action.payload.task,
          entityTaskStatus: "idle",
        })
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId]
        const index = tasksForTodolist.findIndex(
          (task) => task.id === action.payload.taskId,
        )
        if (index > -1) tasksForTodolist.splice(index, 1)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId]
        const index = tasksForTodolist.findIndex(
          (task) => task.id === action.payload.taskId,
        )
        if (index > -1)
          tasksForTodolist[index] = {
            ...tasksForTodolist[index],
            ...action.payload.apiModel,
          }
      })
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach(
          (ts: TodolistData) => (state[ts.id] = []),
        )
      })
      .addCase(unloadTodolists, () => {
        return {}
      })
  },
})

//create thunks
const fetchTasksTC = createAppAsyncThunk<
  { tasks: TaskNewData[]; todolistId: string },
  string
>(`${slice.name}/fetchTacks`, async (todolistId, thunkAPI) => {
  try {
    thunkAPI.dispatch(appActions.setStatus("loading"))
    const res = await tasksAPI.getTask(todolistId)
    const tasks = res.data.items
    const newTasks: TaskNewData[] = tasks.map((t) => ({
      ...t,
      entityTaskStatus: "idle" as RequestStatusType,
    }))
    thunkAPI.dispatch(appActions.setStatus("succeeded"))
    return { tasks: newTasks, todolistId }
  } catch (err) {
    handleServerNetworkError(err, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null) //catch обязательно должен возвращать значение отличное от undefined
  }
})

const addTaskTC = createAppAsyncThunk<
  { task: TaskData },
  { title: string; todolistId: string }
>(`${slice.name}/addTack`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))
    const res = await tasksAPI.createTask(arg)
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus("succeeded"))
      return { task: res.data.data.item }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err, thunkAPI.dispatch)
    return rejectWithValue(null)
  }
})

const removeTaskTC = createAppAsyncThunk<
  { taskId: string; todolistId: string },
  { taskId: string; todolistId: string }
>(`${slice.name}/removeTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))
    const res = await tasksAPI.deleteTask(arg)
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus("succeeded"))
      return { taskId: arg.taskId, todolistId: arg.todolistId }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  }
})

const updateTaskTC = createAppAsyncThunk<
  {
    taskId: string
    todolistId: string
    apiModel: UpdateTaskModelType
  },
  UpdateTaskArgs
>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  try {
    const task = getState().tasks[arg.todolistId].find(
      (ts) => ts.id === arg.taskId,
    )
    if (!task) {
      return rejectWithValue(null)
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...arg.domainModel,
    }
    dispatch(appActions.setStatus("loading"))
    const res = await tasksAPI.updateTask(arg)
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus("succeeded"))
      return {
        taskId: arg.taskId,
        todolistId: arg.todolistId,
        apiModel,
      }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions
export const tasksThunks = {
  fetchTasksTC,
  addTaskTC,
  removeTaskTC,
  updateTaskTC,
}

type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type UpdateTaskArgs = {
  taskId: string
  todolistId: string
  domainModel: UpdateDomainTaskModelType
}
