import { Dispatch } from 'redux'
import {
    SetAppErrorAC,
    SetAppStatusAC,
    setAppStatusAC
} from './app-reducer'
import { authAPI} from '../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { ThunkAction } from 'redux-thunk'
import { AppRootStateType } from './store'
import { LoginData } from '../features/Login/Login'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ReturnType<typeof setIsLoggedInAC>
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
export const loginTC = (value: LoginData): ThunkAction<Promise<void>, AppRootStateType, unknown, ActionsType> => async (dispatch: Dispatch<ActionsType>) => {
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

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusAC
    | SetAppErrorAC