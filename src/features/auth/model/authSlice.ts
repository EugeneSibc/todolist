import { Dispatch } from "redux"
import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils"
import { LoginData } from "features/auth/ui/Login"
import { unloadTodolists } from "features/todolists/model/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/appSlice"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authAPI } from "../api/authApi"

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
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload
      })
      .addCase(initializeAppTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload
      })
  },
})

// thunks
const loginTC = createAppAsyncThunk<boolean, { value: LoginData }>(
  `${slice.name}/loginTC`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setStatus("loading"))
    try {
      const res = await authAPI.login(arg.value)
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus("succeeded"))
        return true
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch)
      return rejectWithValue(null)
    }
  },
)

const logoutTC = createAppAsyncThunk<any, undefined>(`${slice.name}/logoutTC`, 
  async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))   
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus("succeeded"))
      dispatch(unloadTodolists())
      return false
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  }
})

export const initializeAppTC = createAppAsyncThunk<any, undefined>(`${slice.name}/initializeAppTC`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setStatus("loading"))
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus("succeeded"))
        return true
      } else {
        // handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setStatus("succeeded"))
      dispatch(appActions.setIsInitialized(true))
    }
  }
)

// export const loginTC = (value: LoginData) => async (dispatch: Dispatch) => {
//   dispatch(appActions.setStatus("loading"))
//   try {
//     const res = await authAPI.login(value)
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn(true))
//       dispatch(appActions.setStatus("succeeded"))
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   } catch (e) {
//     handleServerNetworkError(e as { message: string }, dispatch)
//   }
// }

// export const logoutTC = () => async (dispatch: Dispatch) => {
//   dispatch(appActions.setStatus("loading"))
//   try {
//     const res = await authAPI.logout()
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn(false))
//       dispatch(appActions.setStatus("succeeded"))
//       dispatch(unloadTodolists())
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   } catch (e) {
//     handleServerNetworkError(e as { message: string }, dispatch)
//   }
// }

// export const initializeApp = () => async (dispatch: Dispatch) => {
//   dispatch(appActions.setStatus("loading"))
//   try {
//     const res = await authAPI.me()
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn(true))
//       dispatch(appActions.setStatus("succeeded"))
//     } else {
//       handleServerAppError(res.data, dispatch)
//     }
//   } catch (e) {
//     handleServerNetworkError(e as { message: string }, dispatch)
//   } finally {
//     dispatch(appActions.setIsInitialized(true))
//   }
// }  

//reducer
export const authReducer = slice.reducer
// actions
export const authActions = slice.actions
//thunks
export const authThunks = { loginTC, logoutTC, initializeAppTC }
