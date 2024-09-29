import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import MenuIcon from '@mui/icons-material/Menu';
import { RootState } from "../../../app/store"
import { changeThemeAC } from "../../../app/app-reducer"
import { getTheme } from "../../theme/theme"
import { MenuButton } from "../MenuButton"
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";


type ThemeMode = 'dark' | 'light'

export const Header = () => {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.app.themeMode)

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