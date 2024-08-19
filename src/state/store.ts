import { Action, applyMiddleware, combineReducers, createStore, legacy_createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { thunk, ThunkDispatch} from 'redux-thunk'
import { useDispatch } from "react-redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
 //@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
// export const useAppDispatch:AppThunkDispatch = useDispatch()
//@ts-ignore
window.store = store