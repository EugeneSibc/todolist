import { v1 } from "uuid";
import { TodolistData, todolistsAPI } from "../api/todolists-api";
import { Dispatch } from "redux";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

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
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.id ? { ...el, title: action.title } : el)
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
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res: { data: TodolistData[]; }) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === 0) {
        const todolist = res.data.data.item
        dispatch(addTodolistAC(todolist))
        dispatch(setAppStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error'))   
            }
            dispatch(setAppStatusAC('failed'))
        }
    })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(id).then(res => {
        dispatch(removeTodolistAC(id))
        dispatch(setAppStatusAC('succeeded'))

    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(id, title).then(res => {
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setAppStatusAC('succeeded'))
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
export const addTodolistAC = (todolist: TodolistData) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id, title
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