import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';

// type TodolistsType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }

export type FilterValueType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    // let [tasks, setTasks] = useState<TaskStateTupe>({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},

    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ]
    // })




    type TodolistsType = {
        id: string
        title: string
    }

    type TaskDataType = {
        data: TaskType[]
        filter: FilterValueType
    }

    type TasksStateType = {
        [key: string]: TaskDataType
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistId1, title: "What to learn" },
        { id: todolistId2, title: "What to buy" }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                { id: v1(), title: "HTML&CSS1111", isDone: true },
                { id: v1(), title: "JS1111", isDone: true }
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                { id: v1(), title: "HTML&CSS22222", isDone: true },
                { id: v1(), title: "JS2222", isDone: true }
            ],
            filter: "all"
        }
    });

    const addTasks = (todolistId: string, title: string) => {
        let newTask = { id: v1(), title, isDone: false }
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})


        // let newTask = { id: v1(), title, isDone: false }
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [newTask, ...todolistTasks]
        // setTasks({ ...tasks })
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data:tasks[todolistId].data.filter(t => t.id !== taskId)}})
        
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        // setTasks({ ...tasks })
    }

    const changeFilter = (todolistId: string, filterValue: FilterValueType) => {
        setTasks({ ...tasks, [todolistId]: { ...tasks[todolistId], filter: filterValue } })

        // let todolist = todolists.find(el => el.id === todolistId)
        // if (todolist) {
        //     todolist.filter = filterValue
        //     setTodolists([...todolists])
        // }
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], 
            data: tasks[todolistId].data.map(t => t.id === taskId ? {...t, isDone:newIsDoneValue} : t)}})

        // let todolistTasks = tasks[todolistId]
        // let task = todolistTasks.find(task => task.id === taskId)
        // if (task) task.isDone = newIsDoneValue
        // setTasks({ ...tasks })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))

        // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({ ...tasks })
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistsType = {id:newTodolistId, title}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolistId]:{data:[], filter:'all'},...tasks})

        // const newTodolistId = v1();
        // const newTodolist: TodolistsType = { id: newTodolistId, title, filter: 'all' }
        // setTodolists([newTodolist, ...todolists,])
        // setTasks({ ...tasks, [newTodolistId]: [] })
    }

    const changeItem = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], 
            data:tasks[todolistId].data.map(t => t.id === taskId ? {...t, title} : t)}})

        // let todolistTasks = tasks[todolistId]
        // let task = todolistTasks.find(task => task.id === taskId)
        // if(task) task.title = title
        // setTasks({...tasks})
    }

    const changeTodosTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))

        // let todolist = todolists.find(todo => todo.id === todolistId)
        // if (todolist) todolist.title = title
        // setTodolists([...todolists])
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist} />
            {todolists.map(todolist => {
                return (
                    <Todolist key={todolist.id}
                        todolistId={todolist.id}
                        theme={todolist.title}
                        tasks={tasks[todolist.id].data}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filterValue={tasks[todolist.id].filter}
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