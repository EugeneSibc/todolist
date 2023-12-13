import React, { useState } from 'react';
import './App.css';
import { FilterValueType, TaskType, Todolist } from './Todolist';
import { Tasks, data1, data2 } from './practise/Task1';
import { log } from 'console';

type TaskFilterType = {
    filter: 'all' | 'active' | 'completed'
}
// let tasks = [
//     { id: 1, title: "HTML&CSS", isDone: true },
//     { id: 2, title: "JS/TS", isDone: true },
//     { id: 3, title: "ReactJS", isDone: true },
//     { id: 4, title: "Redux", isDone: false },
//     { id: 5, title: "Rest API", isDone: false },
//     { id: 6, title: "GraphQL", isDone: false },
// ]
// const tasks2 = [
//     {id:1, title:"Hello world", isDone:true},
//     {id:2, title:"I'm fine", isDone:false},
//     {id:3, title:"Yo", isDone:false},
//     {id:4, title:"How to survive", isDone:false},
// ]


function App() {
    const [tasks, setTasks] = useState([
        {id:1, title:"HTML&CSS", isDone:true},
        {id:2, title:"JS/TS", isDone:true},
        {id:3, title:"ReactJS", isDone:true},
        {id:4, title:"Redux", isDone:false},
        {id:5, title:"Rest API", isDone:false},
        {id:6, title:"GraphQL", isDone:false},
    ])    

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))        
    }
    
    // function removeTask(taskId: number) {
    //     tasks=tasks.filter(t => t.id !== taskId)
    //     console.log(tasks)
    // }

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')
    
    // let tasksForTodolist = filter === 'active'
    //     ? tasks.filter(task => task.isDone === false)
    //     : filter === 'completed'
    //         ? tasks.filter(task => task.isDone === true)
    //         : tasks

    // let tasksForTodolist = tasks
    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === false)
    // }
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === true)
    // }

    const getFilteredTasks=(tasks:Array<TaskType>, filterValue:FilterValueType): Array<TaskType> => {
        return filterValue === 'active'
        ? tasks.filter(task => task.isDone === false)
        : filterValue === 'completed'
            ? tasks.filter(task => task.isDone === true)
            : tasks
    }

    const changeFilter = (filterValue:FilterValueType) => {
        setFilterValue(filterValue)
    }    

    return (
        <div className="App">
            <Todolist title="What to learn"
                    tasks={getFilteredTasks(tasks, filterValue)}
                    // tasks={tasksForTodolist}
                    removeTask={removeTask} 
                    changeFilter={changeFilter}
            />
            {/* <Todolist  title = "Credo" tasks={tasks2}/> */}
            {/* <Tasks data={data1}/>
            <Tasks data={data2}/>*/}
        </div>
    );
}

export default App;