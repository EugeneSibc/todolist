import {
  TaskData,
  TaskPriorities,
  TaskStatuses,
  UpdateTaskModelType,
} from "api/tasks-api"
import {
  tasksAction,
  tasksReducer,
  TasksStateType,
  tasksThunks,
} from "state/tasksSlice"
import { ExtraAction } from "common/types/types"
import { todolistsThunks } from "./todolistsSlice"

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
        status: TaskStatuses.Completed,
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
  const action: ExtraAction<typeof tasksThunks.removeTaskTC.fulfilled> = {
    type: tasksThunks.removeTaskTC.fulfilled.type,
    payload: { taskId: "2", todolistId: "todolistId2" },
  }

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
        status: TaskStatuses.Completed,
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

  const action: ExtraAction<typeof tasksThunks.addTaskTC.fulfilled> = {
    type: tasksThunks.addTaskTC.fulfilled.type,
    payload: { task },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][3].title).toBe("tea")
  expect(endState["todolistId2"][0].completed).toBe(false)
})

test("status of specified task should be changed", () => {
  
  const model: UpdateTaskModelType = {
    title: "",
    description: "",
    completed: false,
    status: 1,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
  }
  const action: ExtraAction<typeof tasksThunks.updateTaskTC.fulfilled> = {
    type: tasksThunks.updateTaskTC.fulfilled.type,
    payload: {
      taskId: "2",
      todolistId: "todolistId2",
      apiModel: model,
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"].length).toBe(3)
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed)
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
  const action: ExtraAction<typeof tasksThunks.updateTaskTC.fulfilled> = {
    type: tasksThunks.updateTaskTC.fulfilled.type,
    payload: {
      taskId: "3",
      todolistId: "todolistId2",
      apiModel: model,
    },
  }

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
  const action: ExtraAction<typeof todolistsThunks.addTodolistTC.fulfilled> = {
    type: todolistsThunks.addTodolistTC.fulfilled.type,
    payload: {
      todolist
    },
  }
  

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
  const action: ExtraAction<typeof todolistsThunks.removeTodolistTC.fulfilled> = {
    type: todolistsThunks.removeTodolistTC.fulfilled.type,
    payload: {
       id: "todolistId2" 
    },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("tasks should be added for todolist", () => {
  //var1
  /*const action = tasksThunks.fetchTasksTC.fulfilled(
    {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
    "",
    {} as any,
  )*/

  //var2
  const action: ExtraAction<typeof tasksThunks.fetchTasksTC.fulfilled> = {
    type: tasksThunks.fetchTasksTC.fulfilled.type,
    payload: {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
  }

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})
