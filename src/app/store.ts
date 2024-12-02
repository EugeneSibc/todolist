import { Action, combineReducers } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { tasksReducer } from "features/task/model/tasksSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "features/todolists/model/todolistsSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

// export const useAppDispatch:AppThunkDispatch = useDispatch()
//@ts-ignore
window.store = store
