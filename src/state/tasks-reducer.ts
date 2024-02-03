import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

type TodolistsReducerActionsType = RemoveTaskACType
//     | AddTaskACType
//     | ChangeStatusACType
//     | ChangeTaskTitleACType

export const tasksReducer = (state: TasksStateType, action: TodolistsReducerActionsType): TasksStateType  => {
    switch (action.type) {
        case "REMOVE-TASK": {
            debugger
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)}
        }
        //     case "ADD-TASK": {
        //         // let newTodolistId = v1();
        //         // let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
        //         // return [...state, newTodolist]
        //     }
        //     case "CHANGE-STATUS": {
        //         // return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        //     }
        //     case "CHANGE-TASK-TITLE":{
        //         // return state.map(el=>el.id===action.payload.id ? {...el,filter: action.payload.filter} :el)
        //     }
        //     default:
        //         return state
        // }
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {id, todolistId}
    } as const
}

// type AddTaskACType = ReturnType<typeof >
// export const addTaskAC = () => {
//     return {
//
//     } as const
// }
//
// type ChangeStatusACType = ReturnType<typeof >
// export const changeStatusAC = () => {
//     return {