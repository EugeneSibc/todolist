import React, { useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './features/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string] : TaskType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })    
    
    const addTasks = (todolistId: string, title: string) => {
        let newTask = { id: v1(), title, isDone: false }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({ ...tasks })
    }

    const removeTask = (todolistId: string, taskId: string) => {        
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({ ...tasks })
    }

    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if (task) task.isDone = newIsDoneValue
        setTasks({ ...tasks })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = { id: newTodolistId, title, filter: 'all' }
        setTodolists([newTodolist, ...todolists,])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }

    const changeItem = (todolistId: string, taskId: string, title: string) => {        
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if(task) task.title = title
        setTasks({...tasks})
    }

    const changeTodosTitle = (todolistId: string, title: string) => {
        let todolist = todolists.find(todo => todo.id === todolistId)
        if (todolist) todolist.title = title
        setTodolists([...todolists])
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist} />
            {todolists.map(todolist => {
                return (
                    <Todolist key={todolist.id}
                        todolistId={todolist.id}
                        theme={todolist.title}
                        tasks={tasks[todolist.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filterValue={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeItem={changeItem}
                        changeTodosTitle={changeTodosTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;