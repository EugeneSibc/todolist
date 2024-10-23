import {  
  changeTodolistFilter,
  changeTodolistTitle,
  FilterValuesType,
  TodolistDomainType,
  todolistsReducer,
  todolistsThunks,
} from "state/todolistsSlice"
import { v1 } from "uuid"
import { tasksReducer, TasksStateType } from "state/tasksSlice"
import { ExtraAction } from "common/types/types"

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
  const action: ExtraAction<typeof todolistsThunks.removeTodolistTC.fulfilled> = {
    type: todolistsThunks.removeTodolistTC.fulfilled.type,
    payload: {
     id:todolistId1
    }
  }

  const endState = todolistsReducer(startState, action)

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

  const action: ExtraAction<typeof todolistsThunks.addTodolistTC.fulfilled> = {
    type: todolistsThunks.addTodolistTC.fulfilled.type,
    payload: {
     todolist: newTodolistTitle
    }
  }

  const endState = todolistsReducer(startState, action)
  
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("new todolist")
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

  const action: ExtraAction<typeof todolistsThunks.addTodolistTC.fulfilled> = {
    type: todolistsThunks.addTodolistTC.fulfilled.type,
    payload: {
     todolist: todolist
    }
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
function removeTodolist(arg0: { id: string }): import("redux").UnknownAction {
  throw new Error("Function not implemented.")
}

