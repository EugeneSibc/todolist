import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistAT } from "./todolists-reducer";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT

let todolistID1 = v1()
let todolistID2 = v1()

// const initialState = {
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},

//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ]
// }

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            debugger
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state, [action.payload.todolistId]: [...state[action.payload.todolistId],
                { id: v1(), title: action.payload.title, isDone: false }]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.newIsDone } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
            }
        case 'ADD-TODOLIST':
            let newTodolist = v1()
            return {...state, [newTodolist]:[]}
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const
}
export const addTaskAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, newIsDone: boolean }) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        taskId,
        title
    } as const
}
