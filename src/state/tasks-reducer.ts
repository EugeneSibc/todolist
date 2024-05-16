import { v1 } from "uuid";
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsAC, addTodolistAC } from "./todolists-reducer"
import { GetTask, TaskData, TaskPriorities, TaskStatuses, UpdateTaskModelType, tasksAPI } from "../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

export type TasksReducerActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsAC
    | setTaskACType


export type TasksStateType = {
    [key: string]: Array<TaskData>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": 
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    t => t.id !== action.payload.id
                )
            }
        
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]
                
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.taskId ? {...t, ...action.model} : t
                )
            }
        }
        case "ADD-TODOLIST": 
            return { [action.todolist.id]: [], ...state }
        
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }

            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todolists.forEach(ts => stateCopy[ts.id] = [])
            return stateCopy
        }
        case "SET-TASK": {
            let stateCopy = { ...state }
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        default: 
            return state
        
    }
}

type UpdateDomainTaskModelType = {
    title?: string,
    startDate?: string,
    priority?: TaskPriorities,
    description?: string,
    deadline?: string,
    status?: TaskStatuses,
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTask(todolistId)
        .then(res => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then(res => {
        const task = res.data.data.item
        dispatch(addTaskAC(task, todolistId))
    })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            const apiModel:UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
            tasksAPI.updateTask(todolistId, taskId, apiModel)
            .then(()=>{
                dispatch(changeTaskAC(todolistId, taskId, apiModel ))
            })
        }
    }
}

    type setTaskACType = ReturnType<typeof setTaskAC>
    export const setTaskAC = (tasks: TaskData[], todolistId: string) => {
        return {
            type: "SET-TASK",
            payload: { tasks, todolistId }
        } as const
    }

    type RemoveTaskACType = ReturnType<typeof removeTaskAC>
    export const removeTaskAC = (id: string, todolistId: string) => {
        return {
            type: "REMOVE-TASK",
            payload: { id, todolistId }
        } as const
    }

    type AddTaskACType = ReturnType<typeof addTaskAC>
    export const addTaskAC = (task: TaskData, todolistId: string) => {
        return {
            type: "ADD-TASK",
            payload: { task, todolistId, }
        } as const
    }

    type ChangeTaskACType = ReturnType<typeof changeTaskAC>
    export const changeTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType ) => {
        return {
            type: "UPDATE-TASK",
            todolistId,
            taskId,
            model 
        } as const
    }

    




