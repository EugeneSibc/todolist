import { TaskPriorities, TaskStatuses, UpdateTaskModelType } from "api/tasks-api"
import { tasksAction, tasksReducer, TasksStateType } from "state/tasksSlice"
import { addTodolist, removeTodolist } from "state/todolistsSlice"

let startState: TasksStateType
const date = new Date()
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        description: "",
        title: "CSS",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "JS",
        completed: true,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "React",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        description: "",
        title: "milk",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId2",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "bread",
        completed: true,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId2",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "tea",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId2",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const action = tasksAction.removeTask({ id: "2", todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todolistId1: [
      {
        description: "",
        title: "CSS",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "JS",
        completed: true,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "React",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId1",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        description: "",
        title: "milk",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolistId2",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
      {
        description: "",
        title: "tea",
        completed: false,
        status: TaskStatuses.InProgress,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "3",
        todoListId: "todolistId2",
        order: 0,
        addedDate: date,
        entityTaskStatus: "idle",
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const task = {
    description: "",
    title: "juce",
    completed: false,
    status: TaskStatuses.InProgress,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    id: "4",
    todoListId: "todolistId2",
    order: 0,
    addedDate: new Date(),
    entityTaskStatus: "idle",
  }
  const action = tasksAction.addTask({ task, todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][3].id).toBeDefined()
  expect(endState["todolistId2"][3].title).toBe("juce")
  expect(endState["todolistId2"][3].completed).toBe(false)
})

test("status of specified task should be changed", () => {
  const model: UpdateTaskModelType = {
    title: "string",
    description: "string",
    completed: false,
    status: TaskStatuses.InProgress,
    priority: TaskPriorities.Low,
    startDate: "string",
    deadline: "string",
  }
  const action = tasksAction.updateTask({ todolistId: "todolistId2", taskId: "2", model })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.InProgress)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress)
})

test("title of specified task should be changed", () => {
  const model: UpdateTaskModelType = {
    title: "coffe",
    description: "string",
    completed: false,
    status: TaskStatuses.InProgress,
    priority: TaskPriorities.Low,
    startDate: "string",
    deadline: "string",
  }
  const action = tasksAction.updateTask({ todolistId: "todolistId2", taskId: "3", model })

  const endstate = tasksReducer(startState, action)

  expect(endstate["todolistId1"][2].title).toBe("React")
  expect(endstate["todolistId2"][2].title).toBe("coffe")
})

test("new array should be added when new todolist is added", () => {
  const todolist = {
    id: "todolistId3",
    addedDate: new Date(),
    order: 1,
    title: "new todolist",
  }
  const action = addTodolist({ todolist })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ id: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
