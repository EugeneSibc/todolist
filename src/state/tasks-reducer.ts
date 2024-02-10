import { TasksStateType } from "../App";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    newIsDoneValue: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {}
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