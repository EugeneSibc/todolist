import { useDispatch, useSelector } from "react-redux"
import { TodolistType } from "../../../../../state/todolists-reducer"
import { RootState } from "../../../../../state/store"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "../../../../../state/tasks-reducer"

import { ChangeEvent } from "react"
import List from '@mui/material/List';
import { Task } from "./task/Task"


type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    
    
    const allTodolistTasks = tasks[todolist.id]
    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (<>
        {
            tasksForTodolist.length === 0
                ? <p>Тасок нет</p>
                : <List>
                    {tasksForTodolist.map((task) => {                        
                        return (
                            <Task task={task} todolist={todolist}/>
                        )
                    })}
                </List>
        }
       </>)  
}

   
