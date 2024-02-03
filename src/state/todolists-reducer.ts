import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type TodolistsReducerActionsType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeFilterACType

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el=>el.id===action.payload.id ? {...el,filter: action.payload.filter} :el)
        }

        default:
            return state
    }
}



export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const

}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId:v1()}
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }

    } as const
}

type ChangeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    }as const
}