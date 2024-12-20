import React, { useEffect } from "react"
import "./App.css"
import LinearProgress from "@mui/material/LinearProgress"
import AppBar from "@mui/material/AppBar/AppBar"
import Menu from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import ErrorSnackbar from "./common/components/errorSnackbar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { selectAppIsInitialized, selectAppIsLoggedIn, selectStatusApp } from "app/app.selectors"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/authSlice"

export function AppWithRedux() {
  const status = useAppSelector(selectStatusApp)
  const isLoggedIn = useAppSelector(selectAppIsLoggedIn)
  const isInitialized = useAppSelector(selectAppIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeAppTC())
  }, [])
  const logoutHandler = () => {
    dispatch(authThunks.logoutTC())
  }
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === "loading" && (
          <Box
            sx={{
              width: "100%",
              position: "fixed",
            }}
          >
            <LinearProgress />
          </Box>
        )}
      </AppBar>
      <Container fixed>
        <Outlet />
      </Container>
    </div>
  )
}
