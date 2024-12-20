import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { createRoot } from "react-dom/client"
import { AppWithRedux } from "./AppWithRedux"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { TodolistsList } from "./features/todolists/ui/todolistList/TodolistsList"
import { Login } from "features/auth/ui/Login"
import { ErrorPage } from "./common/components/errorPage/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithRedux />,
    errorElement: <Navigate to="/404" />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolist" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolist",
        element: <TodolistsList />,
      },
    ],
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
])

const container = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(container)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
