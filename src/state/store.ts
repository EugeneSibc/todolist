import { Action, combineReducers } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { tasksReducer } from "state/tasksSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "state/todolistsSlice"
import { useDispatch, useSelector } from "react-redux"
import { appReducer } from "state/appSlice"
import { authReducer } from "state/authSlice"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
// export const useAppDispatch:AppThunkDispatch = useDispatch()
//@ts-ignore
window.store = store
