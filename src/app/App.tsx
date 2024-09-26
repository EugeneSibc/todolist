import './App.css';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from './header/Header';
import { Main } from './main/Main';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ThemeMode } from '../state/app-reducer';
import { getTheme } from './features/theme/theme';



export const App = () => {
	const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

	return (
		<ThemeProvider theme={getTheme(themeMode)}>
			<CssBaseline/>
			<Header/>
			<Main/>
		</ThemeProvider>
	);
}

