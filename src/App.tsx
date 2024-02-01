import React, { useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
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

type TaskStateTupe = {
    [key: string] : TaskType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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



    // type TodolistsType = {
    //     id: string
    //     title: string
    // }

    // type TaskDataType = {
    //     data: TaskType[]
    //     filter: FilterValueType
    // }

    // type TasksStateType = {
    //     [key: string]: TaskDataType
    // }

    // let todolistId1 = v1();
    // let todolistId2 = v1();

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     { id: todolistId1, title: "What to learn" },
    //     { id: todolistId2, title: "What to buy" }
    // ])

    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: {
    //         data: [
    //             { id: v1(), title: "HTML&CSS1111", isDone: true },
    //             { id: v1(), title: "JS1111", isDone: true }
    //         ],
    //         filter: "all"
    //     },
    //     [todolistId2]: {
    //         data: [
    //             { id: v1(), title: "HTML&CSS22222", isDone: true },
    //             { id: v1(), title: "JS2222", isDone: true }
    //         ],
    //         filter: "all"
    //     }
    // });

    // type TodolistsType = ObjectData & {
    //     todolistId: string
    // }

    // type ObjectData = {
    //     title: string
    //     filter: FilterValueType
    //     tasks: TaskType []
    //     students: string []
    // }
    
    // const todoFromServer:ObjectData[]=[
    //     {
    //         title: "What to learn",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS", isDone: true},
    //             {taskId: v1(), title: "JS", isDone: true}
    //         ],
    //         students: [
    //             'Rick Kane',
    //             'Finnlay Bentley',
    //             'Samia North',
    //             'Isaac Morton',
    //             'Lily-Ann Clifford',
    //             'Thalia Park',
    //             'Sapphire Cruz',
    //             'Cieran Vazquez',
    //             'Anya Estes',
    //             'Dominika Field',
    //             'Rosanna Chung',
    //             'Safiyah Davey',
    //             'Ryley Beasley',
    //             'Kalvin Trejo',
    //             'Evie-Mae Farrell',
    //             'Juliet Valencia',
    //             'Astrid Austin',
    //             'Lyle Montgomery',
    //             'Nisha Mora',
    //             'Kylie Callaghan',
    //             'Star Wilks',
    //             'Marissa Colley',
    //             'Asa Fuller',
    //             'Leigh Kemp',
    //             'Avleen Dawson',
    //             'Sammy Bonilla',
    //             'Acacia Becker',
    //             'Coral Shepherd',
    //             'Melina Molina',
    //             'Kiran Bailey',
    //             'Clara Escobar',
    //             'Alexandru Horn',
    //             'Brandon-Lee Mercado',
    //             'Elouise Weston',
    //             'King Long',
    //             'Kerri Searle',
    //             'Kanye Hamer',
    //             'Elwood Benitez',
    //             'Mikail Whitaker',
    //             'Bobby Hardy',
    //             'Talha Ferry',
    //             'Priscilla Landry',
    //             'Olivia-Grace Cain',
    //             'Kiaan Wallace',
    //             'Wesley Padilla90',
    //             'Ella-Grace Wooten91',
    //             'Kaif Molloy92',
    //             'Kamal Broadhurst93',
    //             'Bianca Ferrell94',
    //             'Micheal Talbot95',
    //         ]
    //     },
    //     {
    //         title: "What to do",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //             {taskId: v1(), title: "JS2", isDone: true}
    //         ],
    //         students: [
    //             'Jago Wormald1',
    //             'Saul Milne2',
    //             'Aariz Hester3',
    //             'Dion Reeve4',
    //             'Anisa Ortega5',
    //             'Blade Cisneros6',
    //             'Malaikah Phelps7',
    //             'Zeeshan Gallagher8',
    //             'Isobella Vo9',
    //             'Rizwan Mathis10',
    //             'Menaal Leach11',
    //             'Kian Walton12',
    //             'Orion Lamb13',
    //             'Faizah Huynh14',
    //             'Crystal Vaughan15',
    //             'Vivien Hickman16',
    //             'Stuart Lu17',
    //             'Karol Davison18',
    //             'Dario Burns19',
    //             'Chloe Rich20',
    //             'Martyna Felix',
    //             'Nida Glass',
    //             'Maeve Miles',
    //             'Hasnain Puckett',
    //             'Ayman Cano',
    //             'Safwan Perry',
    //             'Fox Kelly',
    //             'Louise Barlow',
    //             'Malaki Mcgill',
    //             'Leanna Cline',
    //             'Willard Hodge',
    //             'Amelia Dorsey',
    //             'Kiah Porter',
    //             'Jeanne Daly',
    //             'Mohsin Armstrong',
    //             'Laurie Rangel',
    //             'Princess Tierney',
    //             'Kasim Kendall',
    //             'Darryl Cope',
    //             'Elysha Ray',
    //             'Liyana Harris',
    //             'Kashif Blackburn',
    //             'Atif Zimmerman',
    //             'Sila Hartley',
    //             'Ralphie Hebert',
    //         ]
    //     }
    // ]

    // const [todolists, setTodolist] = useState<TodolistsType[]>([])

    // useEffect(()=>{setTodolist(todoFromServer.map(t => ({todolistId: v1(), ...t})))},[])


    const addTasks = (todolistId: string, title: string) => {
        // let newTask = { taskId: v1(), title, isDone: false }
        // setTodolist(todolists.map(t => (t.todolistId === todolistId ? {...t, tasks:[newTask, ...t.tasks]} : t)))


        // let newTask = { id: v1(), title, isDone: false }
        // setTasks({...tasks, [todolistId]:{...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})


        let newTask = { id: v1(), title, isDone: false }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({ ...tasks })
    }

    const removeTask = (todolistId: string, taskId: string) => {
        // setTodolist(todolists.map(t => (t.todolistId === todolistId ? {...t, tasks:t.tasks.filter(t => t.taskId !== taskId)} : t)))

        // setTasks({...tasks, [todolistId]:{...tasks[todolistId], data:tasks[todolistId].data.filter(t => t.id !== taskId)}})
        
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({ ...tasks })
    }

    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        // setTodolist(todolists.map(t => t.todolistId === todolistId ? {...t, filter:filterValue} : t))

        // setTasks({ ...tasks, [todolistId]: { ...tasks[todolistId], filter: filterValue } })

        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        // setTodolist(todolists.map(t => 
        //     t.todolistId === todolistId 
        //     ? {...t, tasks:t.tasks.map(task => task.taskId === taskId 
        //         ? {...task,isDone:newIsDoneValue} 
        //         : task)} 
        //     : t)
        //     )

        // setTasks({...tasks, [todolistId]:{...tasks[todolistId], 
        //     data: tasks[todolistId].data.map(t => t.id === taskId ? {...t, isDone:newIsDoneValue} : t)}})

        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if (task) task.isDone = newIsDoneValue
        setTasks({ ...tasks })
    }

    const removeTodolist = (todolistId: string) => {
        // setTodolist(todolists.filter(t => t.todolistId !== todolistId))

        // setTodolists(todolists.filter(t => t.id !== todolistId))

        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }

    const addTodolist = (title: string) => {
        // const newTodolist:TodolistsType = {todolistId:v1(), title, filter:'all', tasks: [], students: ['fasf']}
        // setTodolist([newTodolist,...todolists])

        // const newTodolistId = v1();
        // const newTodolist: TodolistsType = {id:newTodolistId, title}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({[newTodolistId]:{data:[], filter:'all'},...tasks})

        const newTodolistId = v1();
        const newTodolist: TodolistType = { id: newTodolistId, title, filter: 'all' }
        setTodolists([newTodolist, ...todolists,])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }

    const changeItem = (todolistId: string, taskId: string, title: string) => {
        // setTodolist(todolists.map(t => t.todolistId === todolistId 
        //     ? {...t, tasks:t.tasks.map(task => task.taskId === taskId 
        //         ? {...task, title} 
        //         : task)} 
        //     : t))

        // setTasks({...tasks, [todolistId]:{...tasks[todolistId], 
        //     data:tasks[todolistId].data.map(t => t.id === taskId ? {...t, title} : t)}})

        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === taskId)
        if(task) task.title = title
        setTasks({...tasks})
    }

    const changeTodosTitle = (todolistId: string, title: string) => {
        // setTodolist(todolists.map(t => t.todolistId === todolistId ? {...t, title, tasks:[...t.tasks]} : t))

        // setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))

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