import React, { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { TaskPriorities, TaskStatuses, UpdateTaskModelType, tasksAPI } from "../api/tasks-api"

export default {
  title: "API",
}

export const GetTasks = () => {
  const [todolistId, setTodolistId] = useState<string>("")
  const [state, setState] = useState<any>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onClickHandler = () => {
    tasksAPI.getTask(todolistId).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      <div>
        <input onChange={onChangeHandler} />
        <button onClick={onClickHandler}>GET TASKS</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}

export const CreateTasks = () => {
  const [todolistId, setTodolistId] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [state, setState] = useState<any>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const onClickHandler = () => {
    tasksAPI.createTask({todolistId, title:value}).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      <div>
        <div>
          TodolistId: <input onChange={onChangeHandler} />
        </div>
        <div>
          Title: <input onChange={onChangeTitleHandler} />
        </div>
        <button onClick={onClickHandler}>CREATE TASK</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}

export const UpdateTasks = () => {
  const [value, setValue] = useState<UpdateTaskModelType>({
    title: "",
    description: "",
    completed: false,
    status: TaskStatuses.InProgress,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
  })
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  const [state, setState] = useState<any>(null)

  const onChangeTodoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue({
      title: newValue,
      description: "",
      completed: false,
      status: TaskStatuses.InProgress,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
    })
  }
  const onClickHandler = () => {
    tasksAPI.updateTask(todolistId, taskId, value).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      <div>
        TodolistId: <input onChange={onChangeTodoHandler} />
      </div>
      <div>
        TaskId: <input onChange={onChangeTaskHandler} />
      </div>
      <div>
        Title: <input onChange={onChangeTitleHandler} />
      </div>
      <button onClick={onClickHandler}>UPDATE TASK</button>
      {JSON.stringify(state)}
    </div>
  )
}

export const DeleteTasks = () => {
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  const [state, setState] = useState<any>(null)

  const onChangeTodoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }
  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }
  const onClickHandler = () => {
    tasksAPI.deleteTask({todolistId, taskId}).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      <div>
        TodolistId: <input onChange={onChangeTodoHandler} />
      </div>
      <div>
        TaskId: <input onChange={onChangeTaskHandler} />
      </div>
      <button onClick={onClickHandler}>DELETE TASK</button>
      {JSON.stringify(state)}
    </div>
  )
}
