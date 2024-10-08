import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  FilterValuesType,
  removeTodolist,
  TodolistDomainType,
  todolistsReducer,
} from "state/todolistsSlice"
import { v1 } from "uuid"
import { tasksReducer, TasksStateType } from "state/tasksSlice"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: new Date(),
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      entityStatus: "idle",
      addedDate: new Date(),
      order: 0,
    },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolist({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  let newTodolistTitle = {
    id: v1(),
    title: "new todolist",
    addedDate: new Date(),
    order: 0,
  }

  const endState = todolistsReducer(startState, addTodolist({ todolist: newTodolistTitle }))

  expect(endState.length).toBe(3)
  expect(endState[1].title).toBe("What to learn")
})

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist"

  const endState = todolistsReducer(
    startState,
    changeTodolistTitle({ id: todolistId2, title: newTodolistTitle }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed"

  const action = {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId2,
    filter: newFilter,
  }

  const endState = todolistsReducer(
    startState,
    changeTodolistFilter({ id: todolistId2, filter: newFilter }),
  )

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []
  const todolist = {
    id: v1(),
    addedDate: new Date(),
    order: 1,
    title: "new todolist",
    filter: "all",
    entityStatus: "idle",
  }

  const action = addTodolist({ todolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
