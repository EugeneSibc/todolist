import { v1 } from "uuid";
import { TodolistData, todolistsAPI } from "../api/todolists-api";
import { Dispatch } from "redux";

export type TodolistsReducerActionsType = RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeFilterACType
    | SetTodolistsAC

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistData & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsReducerActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: new Date,
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
        }
        default:
            return state
    }
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then((res: { data: TodolistData[]; }) => {
            dispatch(setTodolistsAC(res.data))
        })
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
        title,
        todolistId: v1()
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

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    } as const
}

export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistData[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}