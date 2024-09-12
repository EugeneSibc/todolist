// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolist = { id: v1(), title: action.title, filter: 'all' }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.todolistId ? { ...t, title: action.title } : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.todolistId ? { ...t, filter: action.filter } : t)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const addTodolistAC = (title: string) => {
    return { 
        type: 'ADD-TODOLIST',
        title 
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const
}




   
  