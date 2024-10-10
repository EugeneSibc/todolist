import React, { useEffect } from "react"
import LinearProgress from "@mui/material/LinearProgress"
import AppBar from "@mui/material/AppBar/AppBar"
import Menu from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import ErrorSnackbar from "../../components/errorSnackbar/ErrorSnackbar"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../state/store"
import { RequestStatusType } from "../../state/app-reducer"

export function ErrorPage() {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
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
        <h1>Page not found (404)</h1>
      </Container>
    </div>
  )
}