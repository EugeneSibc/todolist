export type ThemeMode = 'dark' | 'light'
 
export type InitialState = typeof initialState
 
const initialState = {
  themeMode: 'light' as ThemeMode,
}
 
export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {...state, themeMode: action.themeMode}
    default:
      return state
  }
}
 
// Action types
type ActionsType = ReturnType<typeof changeThemeAC>

//ActionCreator
export const changeThemeAC = (themeMode:ThemeMode) => ({type: 'CHANGE_THEME', themeMode } as const )