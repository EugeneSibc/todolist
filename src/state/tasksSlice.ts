import {
  TaskData,
  TaskPriorities,
  TaskStatuses,
  UpdateTaskModelType,
  tasksAPI,
} from "api/tasks-api"
import { Dispatch } from "redux"
import { AppRootStateType } from "./store"
import { appActions, RequestStatusType } from "state/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { addTodolist, removeTodolist, setTodolists, unloadTodolists } from "state/todolistsSlice"
import { TodolistData } from "api/todolists-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
    removeTask: (state, action: PayloadAction<{ id: string; todolistId: string }>) => {
      const tasksForTodolist = state[action.payload.todolistId]
      const index = tasksForTodolist.findIndex((task) => task.id === action.payload.id)
      if (index > -1) tasksForTodolist.splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskData; todolistId: string }>) => {
      const tasksForTodolist = state[action.payload.todolistId]
      tasksForTodolist.unshift({ ...action.payload.task, entityTaskStatus: "idle" })
    },
    setTask: (state, action: PayloadAction<{ tasks: TaskNewData[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
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
    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskModelType }>,
    ) => {
      const tasksForTodolist = state[action.payload.todolistId]
      const index = tasksForTodolist.findIndex((task) => task.id === action.payload.taskId)
      if (index > -1)
        tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((ts: TodolistData) => (state[ts.id] = []))
      })
      .addCase(unloadTodolists, (state) => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions

type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  tasksAPI.getTask(todolistId).then((res) => {
    const tasks = res.data.items
    const newTasks = tasks.map((t) => ({ ...t, entityTaskStatus: "idle" as RequestStatusType }))
    dispatch(tasksAction.setTask({ tasks: newTasks, todolistId }))
    dispatch(appActions.setStatus("succeeded"))
  })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  dispatch(tasksAction.changeEntityTaskStatus({ todolistId, taskId, entityTaskStatus: "loading" }))
  tasksAPI
    .deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(tasksAction.removeTask({ id: taskId, todolistId }))
      dispatch(appActions.setStatus("succeeded"))
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch)
      dispatch(
        tasksAction.changeEntityTaskStatus({ todolistId, taskId, entityTaskStatus: "failed" }),
      )
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  tasksAPI.createTask(todolistId, title).then((res) => {
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      dispatch(tasksAction.addTask({ task, todolistId }))
      dispatch(appActions.setStatus("succeeded"))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
}
export const updateTaskTC = (
  todolistId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((ts) => ts.id === taskId)
    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        completed: task.completed,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
      }
      dispatch(appActions.setStatus("loading"))
      tasksAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(tasksAction.updateTask({ todolistId, taskId, model: apiModel }))
            dispatch(appActions.setStatus("succeeded"))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((e) => {
          handleServerNetworkError(e.message, dispatch)
        })
    }
  }
}
