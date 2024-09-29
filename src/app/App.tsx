import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from 'react-redux';
import { getTheme } from '../common/theme/theme';
import { RootState } from './store';
import { ThemeMode } from './app-reducer';
import { Header } from '../common/components/header/Header';
import { Main } from './Main';



export const App = () => {
	const themeMode = useSelector<RootState, ThemeMode>(state =>state.app.themeMode)

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline/>
			<Header/>
			<Main/>
		</ThemeProvider>
	);
}

