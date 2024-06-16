import { v1 } from "uuid";
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsAC, addTodolistAC } from "./todolists-reducer"
import { GetTask, TaskData, TaskPriorities, TaskStatuses, UpdateTaskModelType, tasksAPI } from "../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

export type TasksReducerActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsAC
    | setTaskACType


export type TasksStateType = {
    [key: string]: Array<TaskData>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    t => t.id !== action.payload.id
                )
            }

        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]

            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.taskId ? { ...t, ...action.model } : t
                )
            }
        }
        case "ADD-TODOLIST":
            return { [action.todolist.id]: [], ...state }

        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }

            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todolists.forEach(ts => stateCopy[ts.id] = [])
            return stateCopy
        }
        case "SET-TASK": {
            let stateCopy = { ...state }
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        default:
            return state

    }
}

type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTask(todolistId)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e) => {
        handleServerNetworkError(e.message, dispatch)
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(addTaskAC(task, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            dispatch(setAppStatusAC('loading'))
            tasksAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC(todolistId, taskId, apiModel))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }).catch((e) => {
                    handleServerNetworkError(e.message, dispatch)
                })
        }
    }
}

type setTaskACType = ReturnType<typeof setTaskAC>
export const setTaskAC = (tasks: TaskData[], todolistId: string) => {
    return {
        type: "SET-TASK",
        payload: { tasks, todolistId }
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { id, todolistId }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskData, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: { task, todolistId, }
    } as const
}

type ChangeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        todolistId,
        taskId,
        model
    } as const
}

export const changeEntityTaskStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {
        type: ''
    }
}






