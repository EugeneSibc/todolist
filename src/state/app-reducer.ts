export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
 
const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string
}
 
type InitialStateType = typeof initialState
 
export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}
 
export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status:RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type SetAppErrorAC = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export type ActionsType = SetAppStatusAC
    | SetAppErrorAC
     