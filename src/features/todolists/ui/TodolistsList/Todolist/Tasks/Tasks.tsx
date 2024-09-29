import List from '@mui/material/List';
import { TodolistType } from '../../../../model/todolists-reducer';
import { RootState } from '../../../../../../app/store';
import { TasksStateType } from '../../../../model/tasks-reducer';
import { Task } from './Task/Task';
import { useAppSelector } from '../../../../../../common/components/hooks/useAppSelector';
import { selectTasks } from '../../../../model/tasksSelectors';


type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
    const tasks = useAppSelector<RootState, TasksStateType>(selectTasks)

    const allTodolistTasks = tasks[todolist.id]
    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) => {
                            return (
                                <Task key={task.id}task={task} todolist={todolist} />
                            )
                        })}
                    </List>
            }
        </>
    )
}


