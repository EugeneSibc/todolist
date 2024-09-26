import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { changeThemeAC } from "../../state/app-reducer"
import { getTheme } from "../features/theme/theme"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import { MenuButton } from "../component/MenuButton"
import Switch from "@mui/material/Switch"
import MenuIcon from '@mui/icons-material/Menu';


type ThemeMode = 'dark' | 'light'

export const Header = () => {
    const dispatch = useDispatch()
    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? "dark" : 'light'))
    }
    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler} />
                </div>
            </Toolbar>
        </AppBar>
    )
}