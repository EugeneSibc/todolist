import { v1 } from "uuid";
import { TasksStateType } from "../App";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT

let todolistID1 = v1()
let todolistID2 = v1()

const initialState = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            debugger
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {}
        case 'CHANGE-TASK-STATUS':
            return {}
        case 'CHANGE-TASK-TITLE':
            return {}
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId,
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        newIsDoneValue
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