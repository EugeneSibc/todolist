import { RootState } from "app/store"

export const selectStatusApp = (state: RootState) => state.app.status
export const selectAppIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectAppIsInitialized = (state: RootState) => state.app.isInitialized
export const selectTasks = (state: RootState) => state.tasks
export const selectTodolists = (state: RootState) => state.todolists
