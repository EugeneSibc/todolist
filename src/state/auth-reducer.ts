import { Dispatch } from 'redux'
import {
    SetAppErrorAC,
    setAppIsInitializedAC,
    SetAppStatusAC,
    setAppStatusAC
} from './app-reducer'
import { authAPI} from '../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { LoginData } from '../features/Login/Login'
import { unloadTodolistsAC } from './todolists-reducer'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setIsLoggedInAC>
export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

// thunks
export const loginTC = (value: LoginData) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(value)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as {message: string}, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(unloadTodolistsAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as {message: string}, dispatch)
    }
}
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as {message: string}, dispatch)
    } finally {
        dispatch(setAppIsInitializedAC(true))
    }
}
// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusAC
    | SetAppErrorAC