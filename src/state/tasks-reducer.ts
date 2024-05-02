import { v1 } from "uuid";
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsAC, addTodolistAC } from "./todolists-reducer"
import { TaskData, TaskPriorities, TaskStatuses } from "../api/task-api";

export type TasksReducerActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType  
    | SetTodolistsAC 


export type TasksStateType = {
    [key: string]: Array<TaskData>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id) }
        }
        case "ADD-TASK": {
            let newTask: TaskData = {
                description: '',
                title: action.payload.title,
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: new Date,
            }
            return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask] }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    t => t.id === action.payload.id ? {
                        ...t, completed: action.payload.completed
                    } : t
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    t => t.id === action.payload.id ? {
                        ...t, title: action.payload.title
                    } : t
                )
            }
        }
        case "ADD-TODOLIST": {
            return { [action.todolistId]: [], ...state }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.id]
            return { ...state }
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach(ts => stateCopy[ts.id] = [])
            return stateCopy
        }
        default: {
            return state
        }
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { id, todolistId }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: { title, todolistId }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, completed: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: { id, completed, todolistId }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { id, title, todolistId }
    } as const
}



