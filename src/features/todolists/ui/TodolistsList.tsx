import React, { useCallback, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { TodolistWithRedux } from "common/components/todolist/TodolistWithRedux"
import { changeTodolistFilter, FilterValuesType, todolistsThunks } from "features/todolists/model/todolistsSlice"
import { useAppDispatch, useAppSelector } from "app/store"
import { tasksThunks } from "features/task/model/tasksSlice"
import { TaskStatuses } from "features/task/api/tasks-api"
import { Navigate } from "react-router-dom"
import { selectAppIsLoggedIn, selectTasks, selectTodolists } from "app/app.selectors"

export const TodolistsList = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectAppIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      console.log("todolist loading")
      dispatch(todolistsThunks.fetchTodolistsTC())
    }
  }, [])

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(tasksThunks.addTaskTC({ title, todolistId }))
  }, [])

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(tasksThunks.removeTaskTC({ taskId: id, todolistId }))
  }, [])

  const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(
      tasksThunks.updateTaskTC({
        todolistId,
        taskId,
        domainModel: { status },
      }),
    )
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, id: string, title: string) => {
    dispatch(
      tasksThunks.updateTaskTC({
        todolistId,
        taskId: id,
        domainModel: { title },
      }),
    )
  }, [])

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ id: todolistId, filter }))
  }, [])

  const removeTodolist = useCallback((id: string) => {
    dispatch(todolistsThunks.removeTodolistTC({ id }))
  }, [])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(todolistsThunks.changeTodolistTitleTC({ todolistId: id, title }))
  }, [])

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolistTC({ title }))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm callBack={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id]
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <TodolistWithRedux
                  id={tl.id}
                  title={tl.title}
                  entityStatus={tl.entityStatus}
                  tasks={tasksForTodolist}
                  filter={tl.filter}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  changeFilter={changeFilter}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
