import React, { useState } from 'react';
import './App.css';
import { FilterValueType, TaskStateTupe, TaskType, Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    // const [tasks, setTasks] = useState(
    //     [
    //         { id: v1(), title: "HTML&CSS", isDone: true },
    //         { id: v1(), title: "JS/TS", isDone: true },
    //         { id: v1(), title: "ReactJS", isDone: true },
    //         { id: v1(), title: "Redux", isDone: false },
    //         { id: v1(), title: "Rest API", isDone: false },
    //         { id: v1(), title: "GraphQL", isDone: false },
    //     ]
    // )
    // const [filterValue, setFilterValue] = useState<FilterValueType>('all')

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateTupe>({
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
        let task = { id: v1(), title, isDone: false }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]        
        setTasks({...tasks})
    }

    const removeTask = (todolistId: string, taskId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    // const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValueType): Array<TaskType> => {
    //     return filterValue === 'active'
    //         ? tasks.filter(task => !task.isDone)
    //         : filterValue === 'completed'
    //             ? tasks.filter(task => task.isDone)
    //             : tasks
    // }

    const changeFilter = (todolistId: string, filterValue: FilterValueType) => {
        // setFilterValue(filterValue)
        let todolist = todolists.find(el=>el.id === todolistId)
        if(todolist){
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }   

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        // const nextState: Array<TaskType> = tasks.map((t: TaskType) => (
        //     t.id === taskId ? { ...t, isDone: newIsDoneValue } : t))
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if(task) task.isDone = newIsDoneValue
        setTasks({...tasks})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(todolist => {
                

                return (
                    <Todolist key={todolist.id}
                        todolistId={todolist.id}
                        theme={todolist.title}
                        tasks={tasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        filterValue={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;