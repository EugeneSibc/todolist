import { v1 } from "uuid";
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsAC, addTodolistAC } from "./todolists-reducer"
import { GetTask, TaskData, TaskPriorities, TaskStatuses, UpdateTaskModelType, tasksAPI } from "../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

export type TasksReducerActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
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
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    t => t.id !== action.payload.id
                )
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]
                // const stateCopy = { ...state };
                // const tasks = stateCopy[action.task.todoListId];
                // const newTasks = [action.task, ...tasks];
                // stateCopy[action.task.todoListId] = newTasks;
                // return stateCopy;
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    t => t.id === action.payload.taskId ? {
                        ...t, status: action.payload.status
                    } : t
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    t => t.id === action.payload.id ? {
                        ...t, title: action.payload.title
                    } : t
                )
            }
        }
        case "ADD-TODOLIST": {
            return { [action.todolist.id]: [], ...state }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.id]
            return { ...state }
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
        default: {
            return state
        }
    }
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
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            const model:UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }
            tasksAPI.updateTask(todolistId, taskId, model)
            .then(()=>{
                dispatch(changeTaskStatusAC(todolistId, taskId, model.status ))
            })
        }
    }
}
export const changeTaskTitleTC = (todolistId: string, id: string, newTitle: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === id)
        if(task){
            const model:UpdateTaskModelType = {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }
        
            tasksAPI.updateTask(todolistId, id, model)
            .then(()=>{
                dispatch(changeTaskTitleAC(todolistId, id, model.title))
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

    type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
    export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses ) => {
        return {
            type: "CHANGE-STATUS",
            payload: { todolistId, taskId, status }
        } as const
    }

    type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
    export const changeTaskTitleAC = (todolistId: string, id: string, title: string ) => {
        return {
            type: "CHANGE-TASK-TITLE",
            payload: { id, title, todolistId }
        } as const
    }




