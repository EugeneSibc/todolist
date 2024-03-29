import { FilterValuesType, TasksStateType, TodolistType } from "../AppWithReducers";
import { v1 } from "uuid";
import { AddTodolistACType, RemoveTodolistACType, addTodolistAC } from "./todolists-reducer"

export type TasksReducerActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

 const initialState:TasksStateType = {}   

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id) }
        }
        case "ADD-TASK": {
            let newTask = { id: v1(), title: action.payload.title, isDone: false }
            return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask] }
        }
        case "CHANGE-STATUS": {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? { ...t, isDone: action.payload.isDone } : t) }
        }
        case "CHANGE-TASK-TITLE": {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t) }
        }
        case "ADD-TODOLIST": {
            return { [action.todolistId]: [], ...state  }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.id]
            return {...state}
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
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: { id, isDone, todolistId }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { id, title, todolistId }
    } as const
}

