import React, { useState } from 'react';
import './App.css';
import { FilterValueType, TaskType, Todolist } from './Todolist';

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
        ? tasks.filter(task => !task.isDone)
        : filterValue === 'completed'
            ? tasks.filter(task => task.isDone)
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
        </div>
    );
}

export default App;