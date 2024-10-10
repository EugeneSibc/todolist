import React, { ChangeEvent } from "react"
import { AddItemForm } from "./../addItemForm/AddItemForm"
import { EditableSpan } from "../editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton/IconButton"
import { Delete } from "@mui/icons-material"
import { Button } from "@mui/material"
import { TaskData } from "api/tasks-api"
import { FilterValuesType } from "state/todolistsSlice"

type PropsType = {
  id: string
  title: string
  tasks: TaskData[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
  let allTodolistTasks = props.tasks
  let tasksForTodolist = allTodolistTasks

  if (props.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.completed === false)
  }
  if (props.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.completed === true)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title)
  }

  const onAllClickHandler = () => props.changeFilter(props.id, "all")
  const onActiveClickHandler = () => props.changeFilter(props.id, "active")
  const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan value={props.title} callBack={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTask} />
      <div>
        {tasksForTodolist.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue, props.id)
          }
          const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }

          return (
            <div key={t.id} className={t.completed ? "is-done" : ""}>
              {/* <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        /> */}
              <input type="checkbox" onChange={onChangeHandler} checked={t.completed} />
              <EditableSpan value={t.title} callBack={onTitleChangeHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          )
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
