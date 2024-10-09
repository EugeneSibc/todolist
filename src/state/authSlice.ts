import { Dispatch } from "redux"
import { authAPI } from "api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { LoginData } from "features/Login/Login"
import { unloadTodolists } from "state/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "state/appSlice"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

//reducer
export const authReducer = slice.reducer
// actions
export const authActions = slice.actions

// thunks
export const loginTC = (value: LoginData) => async (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  try {
    const res = await authAPI.login(value)
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(appActions.setStatus("succeeded"))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn(false))
      dispatch(appActions.setStatus("succeeded"))
      dispatch(unloadTodolists())
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  }
}

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setStatus("loading"))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(appActions.setStatus("succeeded"))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  } finally {
    dispatch(appActions.setIsInitialized(true))
  }
}
